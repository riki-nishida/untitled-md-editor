import { Splitter } from "@ark-ui/react/splitter";
import { useState } from "react";
import "./App.css";
import { FileExplorer } from "@/features/file-explorer";

function App() {
	const [selectedFile, setSelectedFile] = useState<string | null>(null);
	const [fileContent, setFileContent] = useState<string>("");

	const handleFileSelect = (filePath: string, content: string) => {
		setSelectedFile(filePath);
		setFileContent(content);
	};

	return (
		<div className="app-layout">
			<header className="app-header">
				<h1 className="app-name">Untitled Markdown Editor</h1>
			</header>
			<div className="app-body">
				<Splitter.Root
					defaultSize={[25, 75]}
					orientation="horizontal"
					className="app-splitter-root"
					panels={[
						{ id: "sidebar", minSize: 15, maxSize: 40 },
						{ id: "main", minSize: 50 },
					]}
				>
					<Splitter.Panel id="sidebar" className="app-sidebar-panel">
						<aside className="app-sidebar">
							<h2 className="app-sidebar-header">Files</h2>
							<div className="app-sidebar-content">
								<FileExplorer onFileSelect={handleFileSelect} />
							</div>
						</aside>
					</Splitter.Panel>
					<Splitter.ResizeTrigger
						id="sidebar:main"
						className="app-resize-trigger"
						aria-label="Resize sidebar"
					/>
					<Splitter.Panel id="main" className="app-main-panel">
						<main className="app-main-content">
							<div className="app-editor-header">
								<div className="app-tabs">
									{selectedFile && <span>{selectedFile.split("/").pop()}</span>}
								</div>
							</div>
							<div className="app-editor">
								{fileContent && (
									// TODO: edtior
									<pre style={{ padding: "20px", whiteSpace: "pre-wrap" }}>
										{fileContent}
									</pre>
								)}
							</div>
						</main>
					</Splitter.Panel>
				</Splitter.Root>
			</div>
		</div>
	);
}

export default App;
