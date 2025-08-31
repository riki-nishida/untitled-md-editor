use crate::config::{MARKDOWN_EXTENSIONS, SUPPORTED_EXTENSIONS};
use std::path::Path;

/// Checks if a file name has a markdown extension.
/// Case-insensitive comparison with .md and .markdown extensions.
pub fn is_markdown_file(name: &str) -> bool {
    MARKDOWN_EXTENSIONS
        .iter()
        .any(|ext| name.to_lowercase().ends_with(&format!(".{}", ext)))
}

/// Checks if a file path has a supported extension.
/// Supported extensions are defined in the config module.
pub fn is_supported_file(path: &Path) -> bool {
    path.extension()
        .and_then(|ext| ext.to_str())
        .map(|ext| SUPPORTED_EXTENSIONS.contains(&ext.to_lowercase().as_str()))
        .unwrap_or(false)
}
