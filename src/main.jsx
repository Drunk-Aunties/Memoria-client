import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
import { AuthProviderWrapper } from "../context/auth.context.jsx";



ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <Router>
            <AuthProviderWrapper>
                <App />
            </AuthProviderWrapper>
        </Router>
    </React.StrictMode>
);
