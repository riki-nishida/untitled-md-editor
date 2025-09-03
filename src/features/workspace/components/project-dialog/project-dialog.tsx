import type { Dialog as ArkDialog } from "@ark-ui/react";
import { Folder } from "lucide-react";
import { useState } from "react";
import { Dialog } from "@/components/dialog";
import { useWorkspaceContext } from "@/contexts/workspace-context";
import { createNewProject, openFolderDialog } from "@/libs/file";
import styles from "./styles.module.css";

type Props = {
	open: boolean;
	onOpenChange: (details: ArkDialog.OpenChangeDetails) => void;
};

export const ProjectDialog = ({ open, onOpenChange }: Props) => {
	const { setWorkspacePath } = useWorkspaceContext();

	const [projectName, setProjectName] = useState("");
	const [parentPath, setParentPath] = useState("");

	const handleSelectParentFolder = async () => {
		const result = await openFolderDialog();
		if (result) {
			setParentPath(result);
		}
	};

	const handleCreate = async () => {
		if (projectName.trim() && parentPath) {
			const projectPath = await createNewProject(
				projectName.trim(),
				parentPath,
			);
			setWorkspacePath(projectPath);
			setProjectName("");
			setParentPath("");
			onOpenChange({ open: false });
		}
	};

	const handleCancel = () => {
		setProjectName("");
		setParentPath("");
		onOpenChange({ open: false });
	};

	return (
		<Dialog title="New Project" open={open} onOpenChange={onOpenChange}>
			<div className={styles.content}>
				<div className={styles.field}>
					<label htmlFor="project-name" className={styles.label}>
						Project Name
					</label>
					<input
						id="project-name"
						type="text"
						value={projectName}
						onChange={(e) => setProjectName(e.target.value)}
						className={styles.input}
						placeholder="My Markdown Project"
						autoFocus
					/>
				</div>
				<div className={styles.field}>
					<label htmlFor="parent-path" className={styles.label}>
						Parent Folder
					</label>
					<div className={styles["folder-selector"]}>
						<input
							id="parent-path"
							type="text"
							value={parentPath}
							readOnly
							className={styles["path-input"]}
							placeholder="Select a parent folder..."
						/>
						<button
							type="button"
							onClick={handleSelectParentFolder}
							className={styles["browse-button"]}
						>
							<Folder size={16} />
							<span>Browse</span>
						</button>
					</div>
				</div>
			</div>
			<div className={styles.actions}>
				<button
					type="button"
					onClick={handleCancel}
					className={styles["cancel-button"]}
				>
					Cancel
				</button>
				<button
					type="button"
					onClick={handleCreate}
					disabled={!projectName.trim() || !parentPath}
					className={styles["create-button"]}
				>
					Create Project
				</button>
			</div>
		</Dialog>
	);
};
