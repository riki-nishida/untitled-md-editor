use crate::config::MAX_FILE_SIZE;
use crate::errors::AppError;
use crate::models::FileItem;
use crate::utils::{is_markdown_file, is_supported_file};
use std::fs;
use std::path::{Path, PathBuf};

/// Service for handling file system operations.
pub struct FileService;

impl FileService {
    /// Asynchronously reads the contents of a folder.
    /// Returns a sorted list of files and directories.
    pub async fn read_folder_contents(folder_path: String) -> Result<Vec<FileItem>, AppError> {
        tokio::task::spawn_blocking(move || Self::read_folder_contents_sync(folder_path))
            .await
            .map_err(|e| AppError::TaskJoinError(e.to_string()))?
    }

    fn read_folder_contents_sync(folder_path: String) -> Result<Vec<FileItem>, AppError> {
        let path = Path::new(&folder_path);

        if !path.exists() || !path.is_dir() {
            return Err(AppError::InvalidFolderPath(folder_path));
        }

        let mut items = Vec::new();

        let entries = fs::read_dir(path)?;

        for entry in entries {
            let entry = entry?;
            let file_path = entry.path();
            let name = file_path
                .file_name()
                .and_then(|n| n.to_str())
                .unwrap_or("Unknown")
                .to_string();

            if name.starts_with('.') {
                continue;
            }

            let is_directory = file_path.is_dir();
            let size = if is_directory {
                None
            } else {
                fs::metadata(&file_path).ok().map(|m| m.len())
            };

            if is_directory || is_markdown_file(&name) {
                items.push(FileItem {
                    name,
                    path: file_path.to_string_lossy().to_string(),
                    is_directory,
                    size,
                });
            }
        }

        items.sort_by(|a, b| match (a.is_directory, b.is_directory) {
            (true, false) => std::cmp::Ordering::Less,
            (false, true) => std::cmp::Ordering::Greater,
            _ => {
                let a_lower = a.name.to_lowercase();
                let b_lower = b.name.to_lowercase();
                a_lower.cmp(&b_lower)
            }
        });

        Ok(items)
    }

    /// Asynchronously reads the content of a file.
    /// Enforces a maximum file size limit and only supports specific file types.
    pub async fn read_file_content(file_path: String) -> Result<String, AppError> {
        tokio::task::spawn_blocking(move || Self::read_file_content_sync(file_path))
            .await
            .map_err(|e| AppError::TaskJoinError(e.to_string()))?
    }

    fn read_file_content_sync(file_path: String) -> Result<String, AppError> {
        let path = Path::new(&file_path);

        if !path.exists() || !path.is_file() {
            return Err(AppError::FileNotFound(file_path));
        }

        if !is_supported_file(path) {
            return Err(AppError::UnsupportedFileType(
                path.extension()
                    .and_then(|ext| ext.to_str())
                    .unwrap_or("unknown")
                    .to_string(),
            ));
        }

        let metadata = fs::metadata(path)?;
        if metadata.len() > MAX_FILE_SIZE {
            return Err(AppError::IoError(std::io::Error::new(
                std::io::ErrorKind::InvalidData,
                format!(
                    "File too large: {} bytes (max: {} bytes)",
                    metadata.len(),
                    MAX_FILE_SIZE
                ),
            )));
        }

        fs::read_to_string(path).map_err(AppError::from)
    }

    /// Creates a new file with optional initial content.
    pub async fn create_file(file_path: String, content: Option<String>) -> Result<(), AppError> {
        tokio::task::spawn_blocking(move || Self::create_file_sync(file_path, content))
            .await
            .map_err(|e| AppError::TaskJoinError(e.to_string()))?
    }

    fn create_file_sync(file_path: String, content: Option<String>) -> Result<(), AppError> {
        let path = Path::new(&file_path);

        if path.exists() {
            return Err(AppError::FileAlreadyExists(file_path));
        }

        if let Some(file_name) = path.file_name() {
            let name = file_name.to_string_lossy();
            if name.is_empty() || name.starts_with('.') {
                return Err(AppError::InvalidFileName(name.to_string()));
            }
        } else {
            return Err(AppError::InvalidFileName(file_path));
        }

        if let Some(parent) = path.parent() {
            fs::create_dir_all(parent)?;
        }

        let content = content.unwrap_or_else(|| String::from(""));
        fs::write(path, content)?;

        Ok(())
    }

    /// Creates a new folder.
    pub async fn create_folder(folder_path: String) -> Result<(), AppError> {
        tokio::task::spawn_blocking(move || Self::create_folder_sync(folder_path))
            .await
            .map_err(|e| AppError::TaskJoinError(e.to_string()))?
    }

    fn create_folder_sync(folder_path: String) -> Result<(), AppError> {
        let path = Path::new(&folder_path);

        if path.exists() {
            return Err(AppError::FileAlreadyExists(folder_path));
        }

        if let Some(folder_name) = path.file_name() {
            let name = folder_name.to_string_lossy();
            if name.is_empty() || name.starts_with('.') {
                return Err(AppError::InvalidFileName(name.to_string()));
            }
        } else {
            return Err(AppError::InvalidFileName(folder_path));
        }

        fs::create_dir_all(path)?;

        Ok(())
    }

    /// Renames a file or folder.
    pub async fn rename_item(old_path: String, new_name: String) -> Result<String, AppError> {
        tokio::task::spawn_blocking(move || Self::rename_item_sync(old_path, new_name))
            .await
            .map_err(|e| AppError::TaskJoinError(e.to_string()))?
    }

    fn rename_item_sync(old_path: String, new_name: String) -> Result<String, AppError> {
        let old_path = Path::new(&old_path);

        if !old_path.exists() {
            return Err(AppError::ItemNotFound(
                old_path.to_string_lossy().to_string(),
            ));
        }

        if new_name.is_empty()
            || new_name.starts_with('.')
            || new_name.contains('/')
            || new_name.contains('\\')
        {
            return Err(AppError::InvalidFileName(new_name));
        }

        let new_path = if let Some(parent) = old_path.parent() {
            parent.join(&new_name)
        } else {
            PathBuf::from(&new_name)
        };

        if new_path.exists() {
            return Err(AppError::FileAlreadyExists(
                new_path.to_string_lossy().to_string(),
            ));
        }

        fs::rename(old_path, &new_path)?;

        Ok(new_path.to_string_lossy().to_string())
    }

    /// Deletes a file or folder.
    pub async fn delete_item(item_path: String) -> Result<(), AppError> {
        tokio::task::spawn_blocking(move || Self::delete_item_sync(item_path))
            .await
            .map_err(|e| AppError::TaskJoinError(e.to_string()))?
    }

    fn delete_item_sync(item_path: String) -> Result<(), AppError> {
        let path = Path::new(&item_path);

        if !path.exists() {
            return Err(AppError::ItemNotFound(item_path));
        }

        if path.is_dir() {
            fs::remove_dir_all(path)?;
        } else {
            fs::remove_file(path)?;
        }

        Ok(())
    }
}
