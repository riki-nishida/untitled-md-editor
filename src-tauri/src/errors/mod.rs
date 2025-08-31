use thiserror::Error;

/// Application-wide error type.
/// Represents all possible errors that can occur in the application.
#[derive(Debug, Error)]
pub enum AppError {
    #[error("Invalid folder path: {0}")]
    InvalidFolderPath(String),

    #[error("File not found: {0}")]
    FileNotFound(String),

    #[error("Unsupported file type: {0}")]
    UnsupportedFileType(String),

    #[error("IO error: {0}")]
    IoError(#[from] std::io::Error),

    #[error("Dialog cancelled")]
    DialogCancelled,

    #[error("Dialog timeout")]
    DialogTimeout,

    #[error("Task join error: {0}")]
    TaskJoinError(String),
}

impl From<AppError> for String {
    fn from(err: AppError) -> String {
        err.to_string()
    }
}
