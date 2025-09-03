import { clsx as cx } from "clsx";
import type { FileTab } from "../../types/tab";
import styles from "./styles.module.css";

type Props = {
	tab: FileTab;
	isActive: boolean;
	onSelect: (tabId: string) => void;
	onClose: (tabId: string) => void;
};

export const TabItem = ({ tab, isActive, onSelect, onClose }: Props) => {
	const handleClose = (e: React.MouseEvent) => {
		e.stopPropagation();
		onClose(tab.id);
	};

	return (
		<button
			type="button"
			className={cx(styles["tab-item"], {
				[styles["tab-item-active"]]: isActive,
			})}
			onClick={() => onSelect(tab.id)}
			title={tab.filePath}
		>
			<span className={styles["tab-item-label"]}>
				{tab.isDirty && <span className={styles["tab-item-dirty"]}>•</span>}
				{tab.fileName}
			</span>
			{/* TODO: Avoid nesting button elements - refactor to prevent invalid HTML */}
			<button
				type="button"
				className={styles["tab-item-close"]}
				onClick={handleClose}
				aria-label={`close ${tab.fileName}`}
			>
				×
			</button>
		</button>
	);
};
