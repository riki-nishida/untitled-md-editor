import { useEditorStore } from "@/stores";
import { TabItem } from "./components/tab-item/tab-item";
import styles from "./styles.module.css";

export const FileTabs = () => {
	const { openFilePaths, activeFilePath, setActiveFilePath, setOpenFilePaths } =
		useEditorStore();

	const handleCloseTab = (path: string) => {
		const newPaths = openFilePaths.filter((p) => p !== path);
		setOpenFilePaths(newPaths);

		if (path !== activeFilePath) return;
		if (newPaths.length === 0) {
			setActiveFilePath(null);
			return;
		}

		const index = openFilePaths.indexOf(path);
		const newIndex = Math.min(index, newPaths.length - 1);
		setActiveFilePath(newPaths[newIndex]);
	};

	if (openFilePaths.length === 0) {
		return (
			<div className={styles["tab-list-empty"]}>
				<span className={styles["tab-list-empty-message"]}>No files open</span>
			</div>
		);
	}

	return (
		<div className={styles["tab-list"]}>
			{openFilePaths.map((filePath) => (
				<TabItem
					key={filePath}
					filePath={filePath}
					isActive={filePath === activeFilePath}
					onSelect={setActiveFilePath}
					onClose={handleCloseTab}
				/>
			))}
		</div>
	);
};
