import { createTreeCollection } from "@ark-ui/react/tree-view";
import type { FileItem, FolderContents } from "@/types/file";

export const createFileTreeCollection = (
	treeData: FileItem[],
	folderContents: Record<string, FolderContents>,
) => {
	const treeWithChildren = treeData.map((item) => ({
		...item,
		children: item.is_directory ? folderContents[item.path] || [] : undefined,
	}));

	return createTreeCollection<FileItem>({
		nodeToValue: (node) => node.path,
		nodeToString: (node) => node.name,
		rootNode: {
			name: "",
			path: "ROOT",
			is_directory: true,
			children: treeWithChildren,
		},
	});
};
