use crate::config::DIALOG_TIMEOUT_SECS;
use crate::errors::AppError;
use std::time::Duration;
use tauri::AppHandle;
use tauri_plugin_dialog::DialogExt;
use tokio::sync::oneshot;

/// Service for handling dialog operations.
pub struct DialogService;

impl DialogService {
    /// Opens a native folder selection dialog.
    /// Returns the selected folder path or None if the user cancels.
    /// Includes a timeout to prevent indefinite waiting.
    pub async fn open_folder_dialog(app_handle: AppHandle) -> Result<Option<String>, AppError> {
        let (tx, rx) = oneshot::channel();

        app_handle.dialog().file().pick_folder(move |folder_path| {
            let _ = tx.send(folder_path.map(|p| p.to_string()));
        });

        match tokio::time::timeout(Duration::from_secs(DIALOG_TIMEOUT_SECS), rx).await {
            Ok(Ok(result)) => Ok(result),
            Ok(Err(_)) => Err(AppError::DialogCancelled),
            Err(_) => Err(AppError::DialogTimeout),
        }
    }
}
