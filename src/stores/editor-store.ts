import { create } from "zustand";
import {
	createFileTabsSlice,
	type FileTabsSlice,
} from "./slices/file-tabs-slice";
import {
	createWorkspaceSlice,
	type WorkspaceSlice,
} from "./slices/workspace-slice";

export type EditorStore = WorkspaceSlice & FileTabsSlice;

export const useEditorStore = create<EditorStore>()((...a) => ({
	...createWorkspaceSlice(...a),
	...createFileTabsSlice(...a),
}));
