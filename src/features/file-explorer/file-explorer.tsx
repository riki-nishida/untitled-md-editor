import { TreeView } from "@ark-ui/react/tree-view";
import {
	NewFileButton,
	NewFolderButton,
	RefreshButton,
} from "./components/action-buttons";
import { TreeNode } from "./components/tree/tree-node";
import { useFileExplorer } from "./hooks/use-file-explorer";
import styles from "./styles.module.css";

export const FileExplorer = () => {
	const { collection, onExpandedChange, onSelectionChange } = useFileExplorer();

	return (
		<div className={styles["file-explorer"]}>
			<div className={styles.header}>
				<div className={styles["header-title"]}>
					<span>Files</span>
					<div className={styles["header-actions"]}>
						{/* TODO:  */}
						<NewFileButton onNewFile={() => {}} />
						<NewFolderButton onNewFolder={() => {}} />
						<RefreshButton onRefresh={() => {}} />
					</div>
				</div>
			</div>
			<div className={styles["tree-container"]}>
				{collection.rootNode.children &&
					collection.rootNode.children.length > 0 && (
						<TreeView.Root
							className={styles["tree-root"]}
							collection={collection}
							onExpandedChange={onExpandedChange}
							onSelectionChange={onSelectionChange}
						>
							<TreeView.Tree>
								{collection.rootNode.children.map((node, index) => (
									<TreeNode key={node.path} node={node} indexPath={[index]} />
								))}
							</TreeView.Tree>
						</TreeView.Root>
					)}
			</div>
		</div>
	);
};
