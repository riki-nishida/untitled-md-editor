import { TreeView } from "@ark-ui/react/tree-view";
import { TreeNode } from "./components/tree-node";
import { useFileExplorer } from "./hooks/use-file-explorer";
import styles from "./styles.module.css";

type Props = {
	onFileSelect: (filePath: string, content: string) => void;
};

export const FileExplorer = ({ onFileSelect }: Props) => {
	const {
		rootPath,
		collection,
		onExpandedChange,
		onOpenFolder,
		onSelectionChange,
	} = useFileExplorer({ onFileSelect });

	return (
		<div className={styles["file-explorer"]}>
			<div className={styles.header}>
				<button
					type="button"
					onClick={onOpenFolder}
					className={styles["open-folder-btn"]}
				>
					open folder
				</button>
				{rootPath && <p className={styles["current-path"]}>{rootPath}</p>}
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
