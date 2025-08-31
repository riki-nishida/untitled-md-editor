import type { TreeView } from "@ark-ui/react";
import { useCallback, useMemo } from "react";
import {
	openFolderDialog,
	readFileContent,
	readFolderContents,
} from "@/libs/file";
import type { FileItem } from "@/types/file";
import { createFileTreeCollection } from "../utils/tree-transforms";
import { useFileTreeState } from "./use-file-tree-state";

type Params = {
	onFileSelect: (filePath: string, content: string) => void;
};

export const useFileExplorer = ({ onFileSelect }: Params) => {
	const { state, dispatch } = useFileTreeState();

	const collection = useMemo(
		() => createFileTreeCollection(state.treeData, state.folderContents),
		[state.treeData, state.folderContents],
	);

	const handleOpenFolder = useCallback(async () => {
		const folderPath = await openFolderDialog();
		if (!folderPath) return;

		const contents = await readFolderContents(folderPath);
		dispatch({ type: "INIT_TREE", path: folderPath, contents });
	}, [dispatch]);

	const handleRefresh = useCallback(async () => {
		if (!state.rootPath) return;

		const contents = await readFolderContents(state.rootPath);
		dispatch({ type: "INIT_TREE", path: state.rootPath, contents });
	}, [state.rootPath, dispatch]);

	const handleExpandedChange = useCallback(
		async (details: TreeView.ExpandedChangeDetails<FileItem>) => {
			for (const path of details.expandedValue) {
				if (state.folderContents[path]) return;

				const contents = await readFolderContents(path);
				dispatch({ type: "SET_FOLDER_CONTENTS", path, contents });
			}
		},
		[state.folderContents, dispatch],
	);

	const handleSelectionChange = useCallback(
		async (details: TreeView.SelectionChangeDetails<FileItem>) => {
			const selectedItem = details.selectedNodes[0];
			if (selectedItem.is_directory || !selectedItem) return;

			const content = await readFileContent(selectedItem.path);
			onFileSelect(selectedItem.path, content);
		},
		[onFileSelect],
	);

	return {
		collection,
		rootPath: state.rootPath,
		onOpenFolder: handleOpenFolder,
		onRefresh: handleRefresh,
		onExpandedChange: handleExpandedChange,
		onSelectionChange: handleSelectionChange,
	};
};
