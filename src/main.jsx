import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ResumeProvider } from "./assets/context/ResumeContext";
import { AuthProvider } from "./assets/context/AuthContext";
import App from "./App";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <ResumeProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ResumeProvider>
    </AuthProvider>
  </React.StrictMode>
);