import { FaSearch, FaBars } from "react-icons/fa";

import { useLocation } from "react-router-dom";

import styles from "./Header.module.css";

function Header() {
  const location = useLocation();

  const pageTitles = {
    "/": "Dashboard",
    "/medicamentos": "Medicamentos",
    "/estoque": "Estoque",
    "/solicitacoes": "Solicitações",
    "/entradas": "Entradas",
    "/saidas": "Saídas",
    "/aprovacoes": "Aprovações",
  };

  const currentPage = pageTitles[location.pathname] || "Saúde Mais";

  const today = new Date().toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  return (
    <header className={styles.header}>
      <div className={styles.pageInfo}>
        <button className={styles.mobileMenuButton}>
          <FaBars />
        </button>

        <h1 className={styles.title}>{currentPage}</h1>

        <p className={styles.date}>{today}</p>
      </div>

      <div className={styles.actions}>
        <div className={styles.searchContainer}>
          <FaSearch />

          <input
            type="text"
            placeholder="Pesquisar..."
            className={styles.searchInput}
          />
        </div>

        <div className={styles.userContainer}>
          <div className={styles.avatar}>A</div>

          <div>
            <h4 className={styles.userName}>Administrador</h4>

            <p className={styles.userRole}>Gestor</p>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
