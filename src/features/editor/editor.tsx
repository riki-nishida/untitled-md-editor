import { useFileContent } from "./hooks/use-file-content";

export const Editor = () => {
	const { content } = useFileContent();

	return (
		<pre style={{ padding: "20px", whiteSpace: "pre-wrap" }}>{content}</pre>
	);
};
