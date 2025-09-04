import { FolderOpen, Plus } from "lucide-react";
import { useCallback } from "react";
import { Menu } from "@/components/menu";
import { openFolderDialog } from "@/libs/file";
import { useEditorStore } from "@/stores";
import styles from "./styles.module.css";

type Props = {
	onOpenDialog: () => void;
};

export const AppHeader = ({ onOpenDialog }: Props) => {
	const {
		workspacePath,
		setWorkspacePath,
		setActiveFilePath,
		setOpenFilePaths,
	} = useEditorStore();

	const handleOpenFolder = useCallback(async () => {
		const result = await openFolderDialog();
		if (!result) return;

		setWorkspacePath(result);
		setActiveFilePath(null);
		setOpenFilePaths([]);
	}, [setWorkspacePath, setActiveFilePath, setOpenFilePaths]);

	const handleMenuSelect = useCallback(() => {
		onOpenDialog();
	}, [onOpenDialog]);

	const menuItems = [
		{
			value: "new-project",
			label: "New Project",
			icon: <FolderOpen size={14} />,
		},
	];

	return (
		<header className={styles.header}>
			<h1 className={styles.title}>Untitled Markdown Editor</h1>
			<div className={styles.workspace}>
				{workspacePath && (
					<div className={styles.breadcrumb}>
						<span className={styles["breadcrumb-path"]}>{workspacePath}</span>
					</div>
				)}
				<div className={styles.actions}>
					<button
						type="button"
						onClick={handleOpenFolder}
						className={styles["action-button"]}
						title="Open Folder"
					>
						<FolderOpen size={16} />
						<span>Open Folder</span>
					</button>
					<Menu items={menuItems} onSelect={handleMenuSelect}>
						<Plus size={16} />
						<span>New</span>
					</Menu>
				</div>
			</div>
		</header>
	);
};
