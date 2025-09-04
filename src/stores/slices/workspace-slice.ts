import type { StateCreator } from "zustand";

export type WorkspaceSlice = {
	workspacePath: string | null;
	setWorkspacePath: (path: string | null) => void;
};

export const createWorkspaceSlice: StateCreator<
	WorkspaceSlice,
	[],
	[],
	WorkspaceSlice
> = (set) => ({
	workspacePath: null,
	setWorkspacePath: (path) => set({ workspacePath: path }),
});
