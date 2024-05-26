import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import "react-lazy-load-image-component/src/effects/opacity.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Remove Preload scripts loading
postMessage({ payload: "removeLoading" }, "*");
