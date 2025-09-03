import { AppHeader } from "./components/app-header";
import { ProjectDialog } from "./components/project-dialog";
import { useProjectDialog } from "./hooks/use-project-dialog";

export const Workspace = () => {
	const { isOpen, handleOpenDialog, handleDialogClose } = useProjectDialog();

	return (
		<>
			<AppHeader onOpenDialog={handleOpenDialog} />
			{isOpen && (
				<ProjectDialog open={isOpen} onOpenChange={handleDialogClose} />
			)}
		</>
	);
};
