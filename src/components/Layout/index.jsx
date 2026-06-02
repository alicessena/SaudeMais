import { Outlet } from "react-router-dom";
import { useState } from "react";

import Sidebar from "../Sidebar";
import Header from "../Header";

import styles from "./Layout.module.css";

function Layout() {
  const [sidebarOpen, setSidebarOpen] =
  useState(false);

  return (
    <div className={styles.layout}>
      <Sidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      <div className={styles.content}>
        <Header
          setSidebarOpen={setSidebarOpen}
        />

        <main className={styles.main}>
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default Layout;