import type { StateCreator } from "zustand";

export type FileTabsSlice = {
	activeFilePath: string | null;
	openFilePaths: string[];
	fileContents: Map<string, string>;
	setActiveFilePath: (path: string | null) => void;
	setOpenFilePaths: (paths: string[]) => void;
	setFileContent: (path: string, content: string) => void;
};

export const createFileTabsSlice: StateCreator<
	FileTabsSlice,
	[],
	[],
	FileTabsSlice
> = (set) => ({
	activeFilePath: null,
	openFilePaths: [],
	fileContents: new Map(),

	setActiveFilePath: (path) => set({ activeFilePath: path }),
	setOpenFilePaths: (paths) => set({ openFilePaths: paths }),
	setFileContent: (path, content) => {
		set((state) => ({
			fileContents: new Map(state.fileContents).set(path, content),
		}));
	},
});
