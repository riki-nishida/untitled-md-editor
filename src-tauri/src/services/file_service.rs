use crate::config::MAX_FILE_SIZE;
use crate::errors::AppError;
use crate::models::FileItem;
use crate::utils::{is_markdown_file, is_supported_file};
use std::fs;
use std::path::Path;

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
}
