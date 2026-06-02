import { NavLink } from "react-router-dom";

import {
  FaChartPie,
  FaPills,
  FaBoxes,
  FaClipboardList,
  FaArrowDown,
  FaArrowUp,
  FaCheckCircle,
  FaHeartbeat,
} from "react-icons/fa";

import styles from "./Sidebar.module.css";

const menuItems = [
  {
    path: "/",
    label: "Dashboard",
    icon: <FaChartPie />,
  },
  {
    path: "/medicamentos",
    label: "Medicamentos",
    icon: <FaPills />,
  },
  {
    path: "/estoque",
    label: "Estoque",
    icon: <FaBoxes />,
  },
  {
    path: "/solicitacoes",
    label: "Solicitações",
    icon: <FaClipboardList />,
  },
  {
    path: "/entradas",
    label: "Entradas",
    icon: <FaArrowDown />,
  },
  {
    path: "/saidas",
    label: "Saídas",
    icon: <FaArrowUp />,
  },
  {
    path: "/aprovacoes",
    label: "Aprovações",
    icon: <FaCheckCircle />,
  },
];

function Sidebar({sidebarOpen, setSidebarOpen}) {
     console.log("sidebarOpen:", sidebarOpen);
  return (
    <>
      {sidebarOpen && (
        <div className={styles.overlay} onClick={() => setSidebarOpen(false)} />
      )}
      <aside
  className={`${styles.sidebar} ${
    sidebarOpen
      ? styles.mobileOpen
      : ""
  }`}
>
        <div className={styles.logoContainer}>
          <div className={styles.logoIcon}>
            <FaHeartbeat />
          </div>

          <div>
            <h1 className={styles.logoTitle}>Saúde Mais</h1>
            <span className={styles.logoSubtitle}>Gestão Farmacêutica</span>
          </div>
        </div>

        <nav className={styles.navigation}>
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === "/"}
              onClick={() => {
                if (window.innerWidth <= 768) {
                  setSidebarOpen(false);
                }
              }}
              className={({ isActive }) =>
                isActive ? styles.activeLink : styles.link
              }
            >
              <span className={styles.icon}>{item.icon}</span>

              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>

        <div className={styles.footer}>
          <p>Saúde Mais v1.0</p>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;
