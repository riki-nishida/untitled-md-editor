import { FolderPlus } from "lucide-react";
import { IconButton } from "@/components/icon-button";

type Props = {
	onNewFolder: () => void;
	disabled?: boolean;
};

export const NewFolderButton = ({ onNewFolder, disabled = false }: Props) => {
	return (
		<IconButton onClick={onNewFolder} title="New Folder" disabled={disabled}>
			<FolderPlus size={16} />
		</IconButton>
	);
};
