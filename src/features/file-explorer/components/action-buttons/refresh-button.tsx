import { RotateCw } from "lucide-react";
import { IconButton } from "@/components/icon-button";

type Props = {
	onRefresh: () => void;
	disabled?: boolean;
};

export const RefreshButton = ({ onRefresh, disabled = false }: Props) => {
	return (
		<IconButton onClick={onRefresh} title="Refresh" disabled={disabled}>
			<RotateCw size={16} />
		</IconButton>
	);
};
