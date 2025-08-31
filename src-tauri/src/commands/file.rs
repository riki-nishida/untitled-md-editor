use crate::errors::AppError;
use crate::models::FileItem;
use crate::services::FileService;

/// Reads the contents of a folder and returns a list of files and subdirectories.
/// Only returns markdown files and directories, excluding hidden files.
#[tauri::command]
pub async fn read_folder_contents(folder_path: String) -> Result<Vec<FileItem>, String> {
    FileService::read_folder_contents(folder_path)
        .await
        .map_err(|e: AppError| e.to_string())
}

/// Reads the content of a file and returns it as a string.
/// Only supports files with allowed extensions (md, markdown, txt).
#[tauri::command]
pub async fn read_file_content(file_path: String) -> Result<String, String> {
    FileService::read_file_content(file_path)
        .await
        .map_err(|e: AppError| e.to_string())
}
