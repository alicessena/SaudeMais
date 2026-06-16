import { FaArrowTrendUp, FaBoxes, FaClipboardList, FaExclamationTriangle, FaPills } from "react-icons/fa6";
import DashboardCharts from "../../components/DashboardCharts";
import { Badge, Card, EmptyState } from "../../components/UI";
import { useData } from "../../context/DataContext";
import styles from "./Dashboard.module.css";

function Dashboard() {
  const { medicamentos, estoque, solicitacoes } = useData();

  const estoqueCritico = estoque.filter((item) => item.quantidadeTotal <= item.quantidadeMinima);
  const solicitacoesPendentes = solicitacoes.filter((item) => item.status === "pendente");
  const estoqueTotal = estoque.reduce((total, item) => total + item.quantidadeTotal, 0);
  const concluida = solicitacoes.filter((item) => item.status === "concluida").length;

  const buscarMedicamento = (medicamentoId) => medicamentos.find((med) => med.id === medicamentoId);

  const kpis = [
    {
      title: "Medicamentos",
      value: medicamentos.length,
      subtitle: "catálogo ativo",
      icon: <FaPills />,
      trend: "+12% este ciclo",
      tone: "primary",
    },
    {
      title: "Itens em estoque",
      value: estoqueTotal,
      subtitle: "unidades disponíveis",
      icon: <FaBoxes />,
      trend: "+8% vs. mês anterior",
      tone: "info",
    },
    {
      title: "Pendências",
      value: solicitacoesPendentes.length,
      subtitle: "aguardando análise",
      icon: <FaClipboardList />,
      trend: "SLA em atenção",
      tone: "warning",
    },
    {
      title: "Alertas críticos",
      value: estoqueCritico.length,
      subtitle: "abaixo do mínimo",
      icon: <FaExclamationTriangle />,
      trend: "repor primeiro",
      tone: "danger",
    },
  ];

  return (
    <div className={styles.container}>
      <section className={styles.hero}>
        <div>
          <Badge tone="success">Painel executivo</Badge>
          <h2>Visão geral da operação farmacêutica</h2>
          <p>Acompanhe estoque, solicitações e movimentações com indicadores consolidados para tomada de decisão.</p>
        </div>
        <div className={styles.heroMetric}>
          <FaArrowTrendUp />
          <strong>{Math.round((concluida / Math.max(solicitacoes.length, 1)) * 100)}%</strong>
          <span>solicitações concluídas</span>
        </div>
      </section>

      <section className={styles.kpiGrid} aria-label="Indicadores principais">
        {kpis.map((item) => (
          <Card key={item.title} className={styles.kpiCard}>
            <div className={`${styles.kpiIcon} ${styles[item.tone]}`}>{item.icon}</div>
            <div>
              <span>{item.title}</span>
              <strong>{item.value}</strong>
              <p>{item.subtitle}</p>
            </div>
            <Badge tone={item.tone === "danger" ? "danger" : item.tone === "warning" ? "warning" : "success"}>
              {item.trend}
            </Badge>
          </Card>
        ))}
      </section>

      <DashboardCharts />

      <section className={styles.contentGrid}>
        <Card className={styles.panel}>
          <header>
            <h3>Estoque crítico</h3>
            <Badge tone={estoqueCritico.length ? "danger" : "success"}>{estoqueCritico.length} alertas</Badge>
          </header>

          {estoqueCritico.length === 0 ? (
            <EmptyState
              icon={<FaBoxes />}
              title="Sem medicamentos críticos"
              description="Todos os itens estão acima do estoque mínimo configurado."
            />
          ) : (
            <div className={styles.alertList}>
              {estoqueCritico.map((item) => {
                const medicamento = buscarMedicamento(item.medicamentoId);
                const percent = Math.min(100, Math.round((item.quantidadeTotal / Math.max(item.quantidadeMinima, 1)) * 100));

                return (
                  <article key={item.id} className={styles.alertItem}>
                    <div>
                      <strong>{medicamento?.nome || "Medicamento não encontrado"}</strong>
                      <span>
                        {item.quantidadeTotal} em estoque · mínimo {item.quantidadeMinima}
                      </span>
                    </div>
                    <div className={styles.progressTrack} aria-label={`Estoque em ${percent}% do mínimo`}>
                      <span style={{ width: `${percent}%` }} />
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </Card>

        <Card className={styles.panel}>
          <header>
            <h3>Fluxo de solicitações</h3>
            <Badge tone="info">{solicitacoes.length} total</Badge>
          </header>

          {["pendente", "aprovada", "reprovada", "concluida"].map((status) => (
            <div key={status} className={styles.statRow}>
              <span>{status}</span>
              <strong>{solicitacoes.filter((item) => item.status === status).length}</strong>
            </div>
          ))}
        </Card>
      </section>
    </div>
  );
}

export default Dashboard;
