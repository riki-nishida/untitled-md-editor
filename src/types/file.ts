/**
 * File item type definition
 * Corresponds to Rust's FileItem struct
 */
export type FileItem = {
	name: string;
	path: string;
	is_directory: boolean;
	size?: number;
	children?: FileItem[];
};

export type FolderDialog = string | null;

export type FileContent = string;

export type FolderContents = FileItem[];
