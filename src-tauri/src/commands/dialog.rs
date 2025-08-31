use crate::errors::AppError;
use crate::services::DialogService;
use tauri::AppHandle;

/// Opens a folder selection dialog for the user.
/// Returns the selected folder path or None if cancelled.
#[tauri::command]
pub async fn open_folder_dialog(app_handle: AppHandle) -> Result<Option<String>, String> {
    DialogService::open_folder_dialog(app_handle)
        .await
        .map_err(|e: AppError| e.to_string())
}
