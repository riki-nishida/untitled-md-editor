import { useEffect, useState } from "react";
import { useEditorStore } from "@/stores";

export const useFileContent = () => {
	const { activeFilePath, fileContents } = useEditorStore();
	const [content, setContent] = useState("");

	useEffect(() => {
		if (!activeFilePath) {
			setContent("");
			return;
		}

		const cachedContent = fileContents.get(activeFilePath);
		if (!cachedContent) return;
		setContent(cachedContent);
	}, [activeFilePath, fileContents]);

	return { content };
};
