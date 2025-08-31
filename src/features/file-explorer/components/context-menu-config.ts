import type { ComponentProps } from "react";
import type { ContextMenu } from "@/components/context-menu/context-menu";
import type { FileItem } from "@/types/file";

type ContextMenuItem = ComponentProps<typeof ContextMenu>["items"];

export const getContextMenuItems = (node: FileItem) => {
	const items: ContextMenuItem = [];

	if (node.is_directory) {
		items.push(
			{ value: "newFile", label: "New File" },
			{ value: "newFolder", label: "New Folder" },
			{ separator: true, value: "sep1", label: "" },
		);
	}

	items.push(
		{ value: "rename", label: "Rename" },
		{ value: "delete", label: "Delete" },
	);

	if (node.is_directory) {
		items.push(
			{ separator: true, value: "sep2", label: "" },
			{ value: "refresh", label: "Refresh" },
		);
	}

	return items;
};
