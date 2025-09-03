import { useCallback, useState } from "react";

export const useProjectDialog = () => {
	const [isOpen, setIsOpen] = useState(false);

	const handleOpenDialog = useCallback(() => {
		setIsOpen(true);
	}, []);

	const handleDialogClose = useCallback(() => {
		setIsOpen(false);
	}, []);

	return {
		isOpen,
		handleOpenDialog,
		handleDialogClose,
	};
};
