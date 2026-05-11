import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/global.css";
import Home from "./app/page";
import { zendesk } from "./app/zendesk";

const rootElement = document.getElementById("root");

if (!rootElement) {
	throw new Error("Root element not found");
}

zendesk.load();

createRoot(rootElement).render(
	<StrictMode>
		<Home />
	</StrictMode>,
);
