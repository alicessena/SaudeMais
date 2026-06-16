import { NavLink } from "react-router-dom";
import {
  FaArrowDown,
  FaArrowUp,
  FaBoxes,
  FaChartPie,
  FaCheckCircle,
  FaClipboardList,
  FaHeartbeat,
  FaPills,
  FaTimes,
} from "react-icons/fa";
import styles from "./Sidebar.module.css";

const menuItems = [
  { path: "/", label: "Dashboard", icon: <FaChartPie /> },
  { path: "/medicamentos", label: "Medicamentos", icon: <FaPills /> },
  { path: "/estoque", label: "Estoque", icon: <FaBoxes /> },
  { path: "/solicitacoes", label: "Solicitações", icon: <FaClipboardList /> },
  { path: "/entradas", label: "Entradas", icon: <FaArrowDown /> },
  { path: "/saidas", label: "Saídas", icon: <FaArrowUp /> },
  { path: "/aprovacoes", label: "Aprovações", icon: <FaCheckCircle /> },
];

function Sidebar({ sidebarOpen, setSidebarOpen }) {
  return (
    <>
      <button
        className={`${styles.overlay} ${sidebarOpen ? styles.overlayVisible : ""}`}
        aria-label="Fechar menu"
        onClick={() => setSidebarOpen(false)}
      />

      <aside className={`${styles.sidebar} ${sidebarOpen ? styles.mobileOpen : ""}`} aria-label="Menu principal">
        <div className={styles.logoContainer}>
          <div className={styles.logoIcon} aria-hidden="true">
            <FaHeartbeat />
          </div>
          <div className={styles.brandText}>
            <h1>Saúde Mais</h1>
            <span>Gestão Farmacêutica</span>
          </div>
          <button className={styles.closeButton} aria-label="Fechar menu" onClick={() => setSidebarOpen(false)}>
            <FaTimes />
          </button>
        </div>

        <nav className={styles.navigation}>
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === "/"}
              title={item.label}
              onClick={() => {
                if (window.innerWidth <= 768) setSidebarOpen(false);
              }}
              className={({ isActive }) => `${styles.link} ${isActive ? styles.activeLink : ""}`}
            >
              <span className={styles.icon}>{item.icon}</span>
              <span className={styles.label}>{item.label}</span>
            </NavLink>
          ))}
        </nav>

        <div className={styles.footer}>
          <strong>Saúde Mais</strong>
          <span>v1.0 · Demo executiva</span>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;
