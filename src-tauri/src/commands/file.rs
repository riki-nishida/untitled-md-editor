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

/// Creates a new file with optional initial content.
#[tauri::command]
pub async fn create_file(file_path: String, content: Option<String>) -> Result<(), String> {
    FileService::create_file(file_path, content)
        .await
        .map_err(|e: AppError| e.to_string())
}

/// Creates a new folder.
#[tauri::command]
pub async fn create_folder(folder_path: String) -> Result<(), String> {
    FileService::create_folder(folder_path)
        .await
        .map_err(|e: AppError| e.to_string())
}

/// Renames a file or folder.
/// Returns the new path of the renamed item.
#[tauri::command]
pub async fn rename_item(old_path: String, new_name: String) -> Result<String, String> {
    FileService::rename_item(old_path, new_name)
        .await
        .map_err(|e: AppError| e.to_string())
}

/// Deletes a file or folder.
#[tauri::command]
pub async fn delete_item(item_path: String) -> Result<(), String> {
    FileService::delete_item(item_path)
        .await
        .map_err(|e: AppError| e.to_string())
}
