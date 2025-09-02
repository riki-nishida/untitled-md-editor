import { TabItem } from "./components/tab-item/tab-item";
import styles from "./styles.module.css";
import type { FileTab } from "./types/tab";

type Props = {
	tabs: FileTab[];
	onTabSelect: (tabId: string) => void;
	onTabClose: (tabId: string) => void;
};

export const FileTabs = ({ tabs, onTabSelect, onTabClose }: Props) => {
	const handleTabClose = (tabId: string) => {
		onTabClose(tabId);
	};

	if (tabs.length === 0) {
		return (
			<div className={styles["tab-list-empty"]}>
				<span className={styles["tab-list-empty-message"]}>No files open</span>
			</div>
		);
	}

	return (
		<div className={styles["tab-list"]}>
			{tabs.map((tab) => (
				<TabItem
					key={tab.id}
					tab={tab}
					onSelect={onTabSelect}
					onClose={handleTabClose}
				/>
			))}
		</div>
	);
};
