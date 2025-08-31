use serde::{Deserialize, Serialize};

/// Represents a file or directory in the file system.
#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct FileItem {
    /// Name of the file or directory
    pub name: String,
    /// Absolute path to the file or directory
    pub path: String,
    /// Whether this item is a directory
    pub is_directory: bool,
    /// Size of the file in bytes (None for directories)
    pub size: Option<u64>,
}
