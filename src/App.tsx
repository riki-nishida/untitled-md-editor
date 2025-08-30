import { Splitter } from "@ark-ui/react/splitter";
import "./App.css";

function App() {
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
								{/* TODO:  */}
								<p>File explorer placeholder</p>
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
									<span>Untitled.md</span>
								</div>
							</div>
							<div className="app-editor">
								{/* TODO:  */}
								<p>Editor placeholder</p>
							</div>
						</main>
					</Splitter.Panel>
				</Splitter.Root>
			</div>
		</div>
	);
}

export default App;
