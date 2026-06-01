import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles/global.css";
import { DataProvider } from "./context/DataContext";
import {
  localStorageService,
} from "./services/localStorageService";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

localStorageService.initialize();

ReactDOM.createRoot(
  document.getElementById("root")
).render(
  <React.StrictMode>
    <DataProvider>
      <App />
      <ToastContainer
      position="top-right"
      autoClose={3000}
      hideProgressBar={false}
      newestOnTop
      closeOnClick
      pauseOnHover
      theme="light"
    />
    </DataProvider>
  </React.StrictMode>
);