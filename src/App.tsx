import { Splitter } from "@ark-ui/react/splitter";
import { Editor } from "@/features/editor";
import { FileExplorer } from "@/features/file-explorer";
import { FileTabs } from "@/features/file-tabs";
import { Workspace } from "@/features/workspace";
import "./App.css";

function App() {
	return (
		<div className="app-layout">
			<Workspace />
			<div className="app-container">
				<Splitter.Root
					defaultSize={[25, 75]}
					orientation="horizontal"
					className="app-splitter"
					panels={[
						{ id: "sidebar", minSize: 15, maxSize: 40 },
						{ id: "main", minSize: 50 },
					]}
				>
					<Splitter.Panel id="sidebar" className="app-sidebar-panel">
						<aside className="sidebar">
							<FileExplorer />
						</aside>
					</Splitter.Panel>
					<Splitter.ResizeTrigger
						id="sidebar:main"
						className="app-resize-trigger"
						aria-label="Resize sidebar"
					/>
					<Splitter.Panel id="main" className="app-main-panel">
						<main className="app-main-content">
							<FileTabs />
							<Editor />
						</main>
					</Splitter.Panel>
				</Splitter.Root>
			</div>
		</div>
	);
}

export default App;
