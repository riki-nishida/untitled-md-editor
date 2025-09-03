import type { TreeView } from "@ark-ui/react";
import { useCallback, useEffect, useMemo } from "react";
import { useWorkspaceContext } from "@/contexts/workspace-context";
import { useTabs } from "@/features/file-tabs/hooks/use-tabs";
import { readFileContent, readFolderContents } from "@/libs/file";
import type { FileItem } from "@/types/file";
import { createFileTreeCollection } from "../utils/tree-transforms";
import { useFileTreeState } from "./use-file-tree-state";

export const useFileExplorer = () => {
	const { workspacePath } = useWorkspaceContext();
	const { addTab } = useTabs();

	const { state, dispatch } = useFileTreeState();

	const collection = useMemo(
		() => createFileTreeCollection(state.treeData, state.folderContents),
		[state.treeData, state.folderContents],
	);

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
			addTab(selectedItem.path, content);
		},
		[addTab],
	);

	// 外部からworkspacePathが変更された時にツリーを更新
	useEffect(() => {
		const loadExternalFolder = async () => {
			if (workspacePath && workspacePath !== state.rootPath) {
				const contents = await readFolderContents(workspacePath);
				dispatch({ type: "INIT_TREE", path: workspacePath, contents });
			}
		};

		loadExternalFolder();
	}, [workspacePath, state.rootPath, dispatch]);

	return {
		collection,
		onExpandedChange: handleExpandedChange,
		onSelectionChange: handleSelectionChange,
	};
};
