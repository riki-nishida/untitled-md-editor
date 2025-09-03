import { createContext, type ReactNode, useContext, useState } from "react";

type ContextValue = {
	currentPath: string | null;
	workspacePath: string | null;
	setCurrentPath: (path: string | null) => void;
	setWorkspacePath: (path: string | null) => void;
};

const WorkspaceContext = createContext<ContextValue | null>(null);

type Props = {
	children: ReactNode;
};

export const WorkspaceProvider = ({ children }: Props) => {
	const [currentPath, setCurrentPath] = useState<string | null>(null);
	const [workspacePath, setWorkspacePath] = useState<string | null>(null);

	return (
		<WorkspaceContext.Provider
			value={{ currentPath, setCurrentPath, workspacePath, setWorkspacePath }}
		>
			{children}
		</WorkspaceContext.Provider>
	);
};

export const useWorkspaceContext = () => {
	const context = useContext(WorkspaceContext);
	if (!context) {
		throw new Error(
			"useWorkspaceContext must be used within a WorkspaceProvider",
		);
	}

	return context;
};
