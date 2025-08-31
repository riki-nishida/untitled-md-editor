import { TreeView } from "@ark-ui/react/tree-view";
import { useMemo } from "react";
import { ContextMenu } from "@/components/context-menu/context-menu";
import type { FileItem } from "@/types/file";
import { getContextMenuItems } from "./context-menu-config";
import { TreeNodeBranch } from "./tree-node-branch";
import { TreeNodeItem } from "./tree-node-item";

type Props = {
	node: FileItem;
	indexPath: number[];
};

export const TreeNode = ({ node, indexPath }: Props) => {
	const contextMenuItems = useMemo(() => getContextMenuItems(node), [node]);

	return (
		<TreeView.NodeProvider key={node.path} node={node} indexPath={indexPath}>
			{node.is_directory ? (
				<ContextMenu items={contextMenuItems}>
					<TreeNodeBranch node={node}>
						{node.children?.map((child, index) => (
							<TreeNode
								key={child.path}
								node={child}
								indexPath={[...indexPath, index]}
							/>
						))}
					</TreeNodeBranch>
				</ContextMenu>
			) : (
				<ContextMenu items={contextMenuItems}>
					<TreeNodeItem node={node} />
				</ContextMenu>
			)}
		</TreeView.NodeProvider>
	);
};
