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

export const createFile = async (
	filePath: string,
	content?: string,
): Promise<void> => {
	try {
		await invoke("create_file", {
			filePath,
			content,
		});
	} catch (error) {
		console.error("Failed to create file:", error);
		throw error;
	}
};

export const createFolder = async (folderPath: string): Promise<void> => {
	try {
		await invoke("create_folder", {
			folderPath,
		});
	} catch (error) {
		console.error("Failed to create folder:", error);
		throw error;
	}
};

export const createNewProject = async (
	projectName: string,
	parentPath: string,
): Promise<string> => {
	try {
		const projectPath = `${parentPath}/${projectName}`;

		// Create project folder
		await createFolder(projectPath);

		// Create initial README.md
		const readmeContent = `# ${projectName}

This is a new markdown project.

## Getting Started

Start editing this file to begin your project documentation.
`;
		await createFile(`${projectPath}/README.md`, readmeContent);

		return projectPath;
	} catch (error) {
		console.error("Failed to create new project:", error);
		throw error;
	}
};
