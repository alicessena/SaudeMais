import { useMemo, useState } from "react";
import { FaChevronDown, FaChevronLeft, FaChevronRight, FaSearch, FaSort } from "react-icons/fa";
import styles from "./UI.module.css";

export function Card({ children, className = "" }) {
  return <div className={`${styles.card} ${className}`}>{children}</div>;
}

export function Button({
  children,
  variant = "primary",
  iconOnly = false,
  className = "",
  type = "button",
  ...props
}) {
  return (
    <button
      type={type}
      className={`${styles.button} ${styles[variant]} ${iconOnly ? styles.iconButton : ""} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

export function Badge({ children, tone = "neutral", className = "" }) {
  const toneClass = tone === "danger" ? "dangerTone" : tone;
  return <span className={`${styles.badge} ${styles[toneClass]} ${className}`}>{children}</span>;
}

export function SearchField({ value, onChange, placeholder = "Pesquisar...", label = "Pesquisar" }) {
  return (
    <label className={styles.searchField} aria-label={label}>
      <FaSearch aria-hidden="true" />
      <input value={value} onChange={(event) => onChange(event.target.value)} placeholder={placeholder} />
    </label>
  );
}

export function EmptyState({ icon, title, description }) {
  return (
    <div className={styles.emptyState} role="status">
      {icon}
      <h3>{title}</h3>
      {description && <p>{description}</p>}
    </div>
  );
}

export function Field({ label, children }) {
  return (
    <label className={styles.field}>
      <span>{label}</span>
      {children}
    </label>
  );
}

export function ModalShell({ title, children, onClose }) {
  return (
    <div className={styles.modalOverlay} role="presentation" onMouseDown={onClose}>
      <section
        className={styles.modal}
        role="dialog"
        aria-modal="true"
        aria-label={title}
        onMouseDown={(event) => event.stopPropagation()}
      >
        <header className={styles.modalHeader}>
          <h2>{title}</h2>
          <Button variant="ghost" iconOnly aria-label="Fechar modal" onClick={onClose}>
            ×
          </Button>
        </header>
        <div className={styles.modalBody}>{children}</div>
      </section>
    </div>
  );
}

export function FormActions({ children }) {
  return <div className={styles.formActions}>{children}</div>;
}

export function Form({ children, ...props }) {
  return (
    <form className={styles.form} {...props}>
      {children}
    </form>
  );
}

export function DataTable({
  columns,
  data,
  search,
  onSearch,
  searchPlaceholder,
  actions,
  emptyTitle = "Nenhum registro encontrado",
  emptyDescription = "Ajuste os filtros ou cadastre novos dados para continuar.",
  emptyIcon,
  pageSize = 6,
}) {
  const [sort, setSort] = useState({ key: null, direction: "asc" });
  const [page, setPage] = useState(1);

  const sortedData = useMemo(() => {
    if (!sort.key) return data;

    const column = columns.find((item) => item.key === sort.key);

    return [...data].sort((a, b) => {
      const left = column?.sortValue ? column.sortValue(a) : a[sort.key];
      const right = column?.sortValue ? column.sortValue(b) : b[sort.key];
      const result = String(left ?? "").localeCompare(String(right ?? ""), "pt-BR", {
        numeric: true,
        sensitivity: "base",
      });
      return sort.direction === "asc" ? result : -result;
    });
  }, [columns, data, sort]);

  const totalPages = Math.max(1, Math.ceil(sortedData.length / pageSize));
  const currentPage = Math.min(page, totalPages);
  const visibleData = sortedData.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const handleSort = (column) => {
    if (!column.sortable) return;
    setPage(1);
    setSort((current) => ({
      key: column.key,
      direction: current.key === column.key && current.direction === "asc" ? "desc" : "asc",
    }));
  };

  const handleSearch = (value) => {
    setPage(1);
    onSearch?.(value);
  };

  return (
    <Card className={styles.tableCard}>
      {(onSearch || actions) && (
        <div className={styles.toolbar}>
          {onSearch && (
            <SearchField
              value={search}
              onChange={handleSearch}
              placeholder={searchPlaceholder}
              label={searchPlaceholder}
            />
          )}
          {actions}
        </div>
      )}

      {sortedData.length === 0 ? (
        <EmptyState icon={emptyIcon} title={emptyTitle} description={emptyDescription} />
      ) : (
        <>
          <div className={styles.tableScroll}>
            <table className={styles.table}>
              <thead>
                <tr>
                  {columns.map((column) => (
                    <th key={column.key}>
                      {column.sortable ? (
                        <button className={styles.sortable} onClick={() => handleSort(column)}>
                          {column.header}
                          {sort.key === column.key ? <FaChevronDown aria-hidden="true" /> : <FaSort aria-hidden="true" />}
                        </button>
                      ) : (
                        column.header
                      )}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {visibleData.map((row) => (
                  <tr key={row.id}>
                    {columns.map((column) => (
                      <td
                        key={column.key}
                        data-label={column.header}
                        className={column.isActions ? styles.actionsCell : ""}
                      >
                        {column.render ? column.render(row) : row[column.key]}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <footer className={styles.pagination}>
            <span>
              {visibleData.length} de {sortedData.length} registros
            </span>
            <div className={styles.paginationControls}>
              <Button
                variant="ghost"
                iconOnly
                aria-label="Página anterior"
                disabled={currentPage === 1}
                onClick={() => setPage((value) => Math.max(1, value - 1))}
              >
                <FaChevronLeft />
              </Button>
              <strong>
                Página {currentPage} de {totalPages}
              </strong>
              <Button
                variant="ghost"
                iconOnly
                aria-label="Próxima página"
                disabled={currentPage === totalPages}
                onClick={() => setPage((value) => Math.min(totalPages, value + 1))}
              >
                <FaChevronRight />
              </Button>
            </div>
          </footer>
        </>
      )}
    </Card>
  );
}
