import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles/global.css";
import { DataProvider } from "./context/DataContext";
import { ThemeProvider, useTheme } from "./context/ThemeContext";
import {
  localStorageService,
} from "./services/localStorageService";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

localStorageService.initialize();

function AppShell() {
  const { theme } = useTheme();

  return (
    <>
      <App />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        theme={theme}
      />
    </>
  );
}

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
