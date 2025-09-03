import { TreeView } from "@ark-ui/react/tree-view";
import { ChevronRight, Folder, FolderOpen } from "lucide-react";
import type { ReactNode } from "react";
import type { FileItem } from "@/types/file";
import styles from "./tree-node-branch.module.css";

type Props = {
	node: FileItem;
	children: ReactNode;
};

export const TreeNodeBranch = ({ node, children }: Props) => {
	return (
		<TreeView.Branch className={styles.branch}>
			<TreeView.BranchControl className={styles["branch-control"]}>
				<TreeView.BranchIndicator className={styles["branch-indicator"]}>
					<ChevronRight size={14} />
				</TreeView.BranchIndicator>
				<Folder size={16} className={styles["folder-icon-closed"]} />
				<FolderOpen size={16} className={styles["folder-icon-open"]} />
				<TreeView.BranchText className={styles["branch-text"]}>
					{node.name}
				</TreeView.BranchText>
			</TreeView.BranchControl>
			<TreeView.BranchContent className={styles["branch-content"]}>
				{children}
			</TreeView.BranchContent>
		</TreeView.Branch>
	);
};
