import React from "react";
import ReactDOM from "react-dom/client";
import AppShell from "./AppShell";
import "./styles/global.css";
import { DataProvider } from "./context/DataContext";
import { ThemeProvider } from "./context/ThemeContext";
import {
  localStorageService,
} from "./services/localStorageService";
import "react-toastify/dist/ReactToastify.css";

localStorageService.initialize();

ReactDOM.createRoot(
  document.getElementById("root")
).render(
  <React.StrictMode>
    <ThemeProvider>
      <DataProvider>
        <AppShell />
      </DataProvider>
    </ThemeProvider>
  </React.StrictMode>
);
