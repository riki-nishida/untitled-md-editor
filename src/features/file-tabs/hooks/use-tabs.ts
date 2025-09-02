import { useCallback, useState } from "react";
import type { FileTab } from "../types/tab";

type TabState = {
	tabs: FileTab[];
	activeTabId: string | null;
};

export const useTabs = () => {
	const [tabState, setTabState] = useState<TabState>({
		tabs: [],
		activeTabId: null,
	});

	const addTab = useCallback((filePath: string, content: string) => {
		setTabState((prev) => {
			const existingTab = prev.tabs.find((tab) => tab.filePath === filePath);

			if (existingTab) {
				return {
					...prev,
					activeTabId: existingTab.id,
					tabs: prev.tabs.map((tab) => ({
						...tab,
						isActive: tab.id === existingTab.id,
					})),
				};
			}

			const fileName = filePath.split("/").pop() || "Untitled";
			const newTab: FileTab = {
				id: filePath,
				filePath,
				fileName,
				content,
				isActive: true,
				isDirty: false,
			};

			return {
				tabs: [
					...prev.tabs.map((tab) => ({ ...tab, isActive: false })),
					newTab,
				],
				activeTabId: newTab.id,
			};
		});
	}, []);

	const removeTab = useCallback((tabId: string) => {
		setTabState((prev) => {
			const tabIndex = prev.tabs.findIndex((tab) => tab.id === tabId);
			const remainingTabs = prev.tabs.filter((tab) => tab.id !== tabId);

			if (remainingTabs.length === 0) {
				return {
					tabs: [],
					activeTabId: null,
				};
			}

			let newActiveTabId = prev.activeTabId;
			if (prev.activeTabId === tabId) {
				const newActiveIndex = Math.min(tabIndex, remainingTabs.length - 1);
				newActiveTabId = remainingTabs[newActiveIndex].id;
			}

			return {
				tabs: remainingTabs.map((tab) => ({
					...tab,
					isActive: tab.id === newActiveTabId,
				})),
				activeTabId: newActiveTabId,
			};
		});
	}, []);

	const setActiveTab = useCallback((tabId: string) => {
		setTabState((prev) => ({
			...prev,
			activeTabId: tabId,
			tabs: prev.tabs.map((tab) => ({
				...tab,
				isActive: tab.id === tabId,
			})),
		}));
	}, []);

	const getActiveTab = () => {
		return tabState.tabs.find((tab) => tab.id === tabState.activeTabId);
	};

	return {
		tabs: tabState.tabs,
		activeTab: getActiveTab(),
		addTab,
		removeTab,
		setActiveTab,
	};
};
