import "./index.css";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "@/components/App.jsx";
import { RouterProvider } from "react-router-dom";
import { appRouter } from "./router/AppRouter";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={appRouter}>
      <App />
    </RouterProvider>
  </React.StrictMode>
);
