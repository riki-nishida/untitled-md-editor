import { TreeView } from "@ark-ui/react/tree-view";
import { File } from "lucide-react";
import type { FileItem } from "@/types/file";
import { formatFileSize } from "../utils/format-file-size";
import styles from "./tree-node-item.module.css";

type Props = {
	node: FileItem;
};

export const TreeNodeItem = ({ node }: Props) => {
	return (
		<TreeView.Item className={styles.item}>
			<TreeView.ItemIndicator className={styles["item-indicator"]} />
			<File size={16} className={styles["file-icon"]} />
			<TreeView.ItemText className={styles["item-text"]}>
				{node.name}
			</TreeView.ItemText>
			{node.size !== undefined && (
				<span className={styles["file-size"]}>{formatFileSize(node.size)}</span>
			)}
		</TreeView.Item>
	);
};
