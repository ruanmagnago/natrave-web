import React from "react";
import ReactDOM from "react-dom/client";
import { Router } from "./pages";
import "./global.styles.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router />
  </React.StrictMode>
);
