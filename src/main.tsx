import React from "react";
import ReactDOM from "react-dom/client";
import { WorkspaceProvider } from "@/contexts/workspace-context";
import App from "./App";
import "@/styles/global.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<React.StrictMode>
		<WorkspaceProvider>
			<App />
		</WorkspaceProvider>
	</React.StrictMode>,
);
