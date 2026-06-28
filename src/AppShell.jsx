import App from "./App";
import { useTheme } from "./context/ThemeContext";
import { ToastContainer } from "react-toastify";

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

export default AppShell;
