import { useCallback, useState } from "react";
import { useWorkspaceContext } from "@/contexts/workspace-context";
import type { FileTab } from "../types/tab";

export const useTabs = () => {
	const { currentPath, setCurrentPath } = useWorkspaceContext();
	const [tabs, setTabs] = useState<FileTab[]>([]);

	const addTab = useCallback(
		(filePath: string, content: string) => {
			setTabs((prevTabs) => {
				const existingTab = prevTabs.find((tab) => tab.filePath === filePath);
				if (existingTab) {
					setCurrentPath(filePath);
					return prevTabs;
				}

				const fileName = filePath.split("/").pop() || "Untitled";
				const newTab: FileTab = {
					id: filePath,
					filePath,
					fileName,
					content,
					isDirty: false,
				};

				setCurrentPath(filePath);
				return [...prevTabs, newTab];
			});
		},
		[setCurrentPath],
	);

	const removeTab = useCallback(
		(tabId: string) => {
			setTabs((prevTabs) => {
				const tabToRemove = prevTabs.find((tab) => tab.id === tabId);
				if (!tabToRemove) return prevTabs;

				const tabIndex = prevTabs.indexOf(tabToRemove);
				const newTabs = prevTabs.filter((tab) => tab.id !== tabId);

				if (tabToRemove.filePath === currentPath) {
					if (newTabs.length > 0) {
						const newActiveIndex = Math.min(tabIndex, newTabs.length - 1);
						setCurrentPath(newTabs[newActiveIndex].filePath);
					} else {
						setCurrentPath(null);
					}
				}

				return newTabs;
			});
		},
		[currentPath, setCurrentPath],
	);

	const setActiveTab = useCallback(
		(tabId: string) => {
			setCurrentPath(tabId);
		},
		[setCurrentPath],
	);

	return {
		tabs,
		addTab,
		removeTab,
		setActiveTab,
	};
};
