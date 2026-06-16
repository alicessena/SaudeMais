import { useMemo, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  FaBars,
  FaBell,
  FaBoxes,
  FaCheckCircle,
  FaMoon,
  FaPills,
  FaSearch,
  FaSun,
  FaUserShield,
} from "react-icons/fa";
import { useData } from "../../context/DataContext";
import { useTheme } from "../../context/ThemeContext";
import styles from "./Header.module.css";

const pageTitles = {
  "/": "Dashboard",
  "/medicamentos": "Medicamentos",
  "/estoque": "Estoque",
  "/solicitacoes": "Solicitações",
  "/entradas": "Entradas",
  "/saidas": "Saídas",
  "/aprovacoes": "Aprovações",
};

function Header({ setSidebarOpen }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { medicamentos, estoque, solicitacoes } = useData();
  const { isDark, toggleTheme } = useTheme();
  const [query, setQuery] = useState("");
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  const currentPage = pageTitles[location.pathname] || "Saúde Mais";
  const today = new Date().toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  const criticalStock = estoque.filter((item) => item.quantidadeTotal <= item.quantidadeMinima);
  const pendingRequests = solicitacoes.filter((item) => item.status === "pendente");

  const notifications = useMemo(() => {
    const stockAlerts = criticalStock.slice(0, 4).map((item) => {
      const medicamento = medicamentos.find((med) => med.id === item.medicamentoId);
      return {
        id: `stock-${item.id}`,
        title: medicamento?.nome || "Medicamento sem cadastro",
        description: `Estoque crítico: ${item.quantidadeTotal}/${item.quantidadeMinima}`,
        category: "Estoque",
        unread: true,
        to: "/estoque",
      };
    });

    const requestAlerts = pendingRequests.slice(0, 4).map((item) => ({
      id: `req-${item.id}`,
      title: item.id,
      description: `${item.solicitante} aguarda aprovação`,
      category: "Solicitação",
      unread: true,
      to: "/aprovacoes",
    }));

    return [...stockAlerts, ...requestAlerts];
  }, [criticalStock, medicamentos, pendingRequests]);

  const searchResults = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (normalized.length < 2) return [];

    const medicationResults = medicamentos
      .filter((item) => `${item.nome} ${item.principioAtivo} ${item.fabricante}`.toLowerCase().includes(normalized))
      .slice(0, 4)
      .map((item) => ({
        id: `med-${item.id}`,
        icon: <FaPills />,
        title: item.nome,
        description: `${item.principioAtivo} · ${item.fabricante}`,
        to: "/medicamentos",
      }));

    const requestResults = solicitacoes
      .filter((item) => `${item.id} ${item.solicitante} ${item.motivo}`.toLowerCase().includes(normalized))
      .slice(0, 3)
      .map((item) => ({
        id: `sol-${item.id}`,
        icon: <FaCheckCircle />,
        title: item.id,
        description: `${item.status} · ${item.solicitante}`,
        to: "/solicitacoes",
      }));

    const stockResults = estoque
      .map((item) => ({
        ...item,
        medicamento: medicamentos.find((med) => med.id === item.medicamentoId),
      }))
      .filter((item) => item.medicamento?.nome.toLowerCase().includes(normalized))
      .slice(0, 3)
      .map((item) => ({
        id: `est-${item.id}`,
        icon: <FaBoxes />,
        title: item.medicamento.nome,
        description: `${item.quantidadeTotal} unidades em estoque`,
        to: "/estoque",
      }));

    return [...medicationResults, ...requestResults, ...stockResults].slice(0, 7);
  }, [estoque, medicamentos, query, solicitacoes]);

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    if (searchResults[0]) {
      navigate(searchResults[0].to);
      setQuery("");
    }
  };

  return (
    <header className={styles.header}>
      <div className={styles.pageInfo}>
        <button className={styles.mobileMenuButton} aria-label="Abrir menu" onClick={() => setSidebarOpen(true)}>
          <FaBars />
        </button>
        <div>
          <h1>{currentPage}</h1>
          <p>{today}</p>
        </div>
      </div>

      <form className={styles.searchContainer} onSubmit={handleSearchSubmit}>
        <FaSearch aria-hidden="true" />
        <input
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Pesquisar medicamentos, solicitações..."
          aria-label="Pesquisa global"
        />
        {query.trim().length >= 2 && (
          <div className={styles.searchResults}>
            {searchResults.length === 0 ? (
              <p>Nenhum resultado encontrado.</p>
            ) : (
              searchResults.map((item) => (
                <Link key={item.id} to={item.to} onClick={() => setQuery("")} className={styles.searchResultItem}>
                  <span>{item.icon}</span>
                  <div>
                    <strong>{item.title}</strong>
                    <small>{item.description}</small>
                  </div>
                </Link>
              ))
            )}
          </div>
        )}
      </form>

      <div className={styles.actions}>
        <button className={styles.iconButton} aria-label="Alternar tema" onClick={toggleTheme}>
          {isDark ? <FaSun /> : <FaMoon />}
        </button>

        <div className={styles.notificationWrapper}>
          <button
            className={styles.iconButton}
            aria-label="Abrir central de notificações"
            aria-expanded={notificationsOpen}
            onClick={() => setNotificationsOpen((value) => !value)}
          >
            <FaBell />
            {notifications.length > 0 && <span className={styles.badge}>{notifications.length}</span>}
          </button>
          {notificationsOpen && (
            <section className={styles.notificationsPanel} aria-label="Central de notificações">
              <header>
                <strong>Notificações</strong>
                <span>{notifications.length} não lidas</span>
              </header>
              {notifications.length === 0 ? (
                <p className={styles.emptyNotification}>Tudo em dia por aqui.</p>
              ) : (
                notifications.map((item) => (
                  <Link key={item.id} to={item.to} onClick={() => setNotificationsOpen(false)} className={styles.notificationItem}>
                    <span>{item.category}</span>
                    <strong>{item.title}</strong>
                    <p>{item.description}</p>
                  </Link>
                ))
              )}
            </section>
          )}
        </div>

        <div className={styles.userContainer}>
          <div className={styles.avatar} aria-hidden="true">
            <FaUserShield />
          </div>
          <div>
            <strong>Administrador</strong>
            <span>Gestor operacional</span>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
