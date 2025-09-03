import { FilePlus } from "lucide-react";
import { IconButton } from "@/components/icon-button";

type Props = {
	onNewFile: () => void;
	disabled?: boolean;
};

export const NewFileButton = ({ onNewFile, disabled = false }: Props) => {
	return (
		<IconButton onClick={onNewFile} title="New File" disabled={disabled}>
			<FilePlus size={16} />
		</IconButton>
	);
};
