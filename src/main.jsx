import "./index.css";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "@/components/App.jsx";
import { RouterProvider } from "react-router-dom";
import { appRouter } from "./router/AppRouter";
import { ThemeProvider } from "@mui/material";
import { theme } from "./utils/Themes";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <RouterProvider router={appRouter}>
        <App />
      </RouterProvider>
    </ThemeProvider>
  </React.StrictMode>
);
