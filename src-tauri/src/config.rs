/// Maximum file size in bytes (10 MB)
pub const MAX_FILE_SIZE: u64 = 10 * 1024 * 1024;

/// Dialog timeout in seconds
pub const DIALOG_TIMEOUT_SECS: u64 = 60;

/// Supported file extensions for reading
pub const SUPPORTED_EXTENSIONS: &[&str] = &["md", "markdown", "txt"];

/// Markdown-specific file extensions
pub const MARKDOWN_EXTENSIONS: &[&str] = &["md", "markdown"];
