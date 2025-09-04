import type { TreeView } from "@ark-ui/react";
import { useCallback, useEffect, useState } from "react";
import { readFileContent, readFolderContents } from "@/libs/file";
import { useEditorStore } from "@/stores";
import type { FileItem, FolderContents } from "@/types/file";
import { createFileTreeCollection } from "../utils/tree-transforms";

export const useFileExplorer = () => {
	const {
		workspacePath,
		fileContents,
		openFilePaths,
		setFileContent,
		setOpenFilePaths,
		setActiveFilePath,
	} = useEditorStore();

	const [rootFolderContents, setRootFolderContents] = useState<FolderContents>(
		[],
	);
	const [expandedFolders, setExpandedFolders] = useState<
		Record<string, FolderContents>
	>({});

	const collection = createFileTreeCollection(
		rootFolderContents,
		expandedFolders,
	);

	const handleExpandedChange = useCallback(
		async (details: TreeView.ExpandedChangeDetails<FileItem>) => {
			for (const path of details.expandedValue) {
				const contents = await readFolderContents(path);
				setExpandedFolders((prev) => ({
					...prev,
					[path]: contents,
				}));
			}
		},
		[],
	);

	const openFile = useCallback(
		async (path: string) => {
			if (!fileContents.has(path)) {
				const content = await readFileContent(path);
				setFileContent(path, content);
			}

			if (openFilePaths.includes(path)) {
				setActiveFilePath(path);
				return;
			}

			setOpenFilePaths([...openFilePaths, path]);
			setActiveFilePath(path);
		},
		[
			fileContents,
			openFilePaths,
			setFileContent,
			setOpenFilePaths,
			setActiveFilePath,
		],
	);

	const handleSelectionChange = useCallback(
		async (details: TreeView.SelectionChangeDetails<FileItem>) => {
			const selectedItem = details.selectedNodes[0];
			if (selectedItem.is_directory || !selectedItem) return;

			await openFile(selectedItem.path);
		},
		[openFile],
	);

	useEffect(() => {
		const loadWorkspaceFolder = async () => {
			if (workspacePath) {
				const contents = await readFolderContents(workspacePath);
				setRootFolderContents(contents);
				setExpandedFolders({ [workspacePath]: contents });
			}
		};

		loadWorkspaceFolder();
	}, [workspacePath]);

	return {
		collection,
		onExpandedChange: handleExpandedChange,
		onSelectionChange: handleSelectionChange,
	};
};
