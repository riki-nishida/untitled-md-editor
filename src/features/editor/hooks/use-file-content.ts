import { invoke } from "@tauri-apps/api/core";
import { useEffect, useState } from "react";
import { useWorkspaceContext } from "@/contexts/workspace-context";

export const useFileContent = () => {
	const { currentPath } = useWorkspaceContext();

	const [content, setContent] = useState("");

	useEffect(() => {
		if (!currentPath) {
			setContent("");
			return;
		}

		invoke<string>("read_file_content", { filePath: currentPath })
			.then((data) => {
				setContent(data);
			})
			.catch((err) => {
				console.error("Failed to read file:", err);
				setContent("");
			});
	}, [currentPath]);

	return { content };
};
