import { useWorkspaceContext } from "@/contexts/workspace-context";
import { TabItem } from "./components/tab-item/tab-item";
import { useTabs } from "./hooks/use-tabs";
import styles from "./styles.module.css";

export const FileTabs = () => {
	const { tabs, removeTab, setActiveTab } = useTabs();

	const { currentPath } = useWorkspaceContext();

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
					isActive={tab.filePath === currentPath}
					onSelect={setActiveTab}
					onClose={removeTab}
				/>
			))}
		</div>
	);
};
