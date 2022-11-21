import React from "react";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { UserProvider } from "@contexts/UserProvider";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
        <UserProvider>
            <App />
        </UserProvider>
    </React.StrictMode>
);
