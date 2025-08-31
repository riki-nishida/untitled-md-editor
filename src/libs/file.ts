import { invoke } from "@tauri-apps/api/core";
import type { FileContent, FolderContents, FolderDialog } from "@/types/file";

export const openFolderDialog = async (): Promise<FolderDialog> => {
	try {
		const result = await invoke<FolderDialog>("open_folder_dialog");
		return result;
	} catch (error) {
		// TODO:
		console.error(error);
		return "";
	}
};

export const readFolderContents = async (
	folderPath: string,
): Promise<FolderContents> => {
	try {
		const result = await invoke<FolderContents>("read_folder_contents", {
			folderPath,
		});
		return result;
	} catch (error) {
		// TODO:
		console.error(error);
		return [];
	}
};

export const readFileContent = async (
	filePath: string,
): Promise<FileContent> => {
	try {
		const result = await invoke<FileContent>("read_file_content", {
			filePath,
		});
		return result;
	} catch (error) {
		// TODO:
		console.error(error);
		return "";
	}
};
