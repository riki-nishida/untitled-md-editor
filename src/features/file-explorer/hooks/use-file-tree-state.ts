import { useReducer } from "react";
import type { FolderContents } from "@/types/file";

type FileTreeState = {
	rootPath: string | null;
	treeData: FolderContents;
	folderContents: Record<string, FolderContents>;
};

type FileTreeAction =
	| { type: "INIT_TREE"; path: string; contents: FolderContents }
	| { type: "SET_FOLDER_CONTENTS"; path: string; contents: FolderContents };

const initialState: FileTreeState = {
	rootPath: null,
	treeData: [],
	folderContents: {},
};

export const useFileTreeState = () => {
	const [state, dispatch] = useReducer(fileTreeReducer, initialState);

	return {
		state,
		dispatch,
	};
};

function fileTreeReducer(
	state: FileTreeState,
	action: FileTreeAction,
): FileTreeState {
	switch (action.type) {
		case "INIT_TREE":
			return {
				rootPath: action.path,
				treeData: action.contents,
				folderContents: {
					[action.path]: action.contents,
				},
			};
		case "SET_FOLDER_CONTENTS":
			return {
				...state,
				folderContents: {
					...state.folderContents,
					[action.path]: action.contents,
				},
			};
		default:
			return state;
	}
}
