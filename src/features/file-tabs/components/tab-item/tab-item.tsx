import { clsx as cx } from "clsx";
import styles from "./styles.module.css";

type Props = {
	filePath: string;
	isActive: boolean;
	onSelect: (path: string) => void;
	onClose: (path: string) => void;
};

export const TabItem = ({ filePath, isActive, onSelect, onClose }: Props) => {
	const fileName = filePath.split("/").pop() || "Untitled";

	return (
		<button
			type="button"
			className={cx(styles["tab-item"], {
				[styles["tab-item-active"]]: isActive,
			})}
			onClick={() => onSelect(filePath)}
			title={filePath}
		>
			<span className={styles["tab-item-label"]}>{fileName}</span>
			{/* TODO: Avoid nesting button elements - refactor to prevent invalid HTML */}
			<button
				type="button"
				className={styles["tab-item-close"]}
				onClick={() => onClose(filePath)}
				aria-label={`close ${fileName}`}
			>
				×
			</button>
		</button>
	);
};
