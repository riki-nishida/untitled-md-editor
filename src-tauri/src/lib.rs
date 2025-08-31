mod commands;
mod config;
mod errors;
mod models;
mod services;
mod utils;

use commands::{dialog, file};

/// Entry point for the Tauri application.
/// Initializes the application with required plugins and command handlers.
#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .plugin(tauri_plugin_dialog::init())
        .plugin(tauri_plugin_fs::init())
        .invoke_handler(tauri::generate_handler![
            dialog::open_folder_dialog,
            file::read_folder_contents,
            file::read_file_content
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
