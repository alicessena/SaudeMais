import { useMemo } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useData } from "../../context/DataContext";
import styles from "./DashboardCharts.module.css";

const COLORS = ["#12824c", "#3157c9", "#d97706", "#dc2626", "#0284c7"];

function groupByDate(items, label) {
  const map = new Map();
  items.forEach((item) => {
    const date = item.dataAprovacao || item.dataSolicitacao || "Sem data";
    map.set(date, (map.get(date) || 0) + Number(item.quantidade || 1));
  });
  return Array.from(map.entries())
    .sort(([left], [right]) => left.localeCompare(right))
    .map(([data, quantidade]) => ({ data, [label]: quantidade }));
}

function DashboardCharts() {
  const { entradas, saidas, estoque, medicamentos, solicitacoes } = useData();

  const entradasData = useMemo(() => groupByDate(entradas, "entradas"), [entradas]);
  const saidasData = useMemo(() => groupByDate(saidas, "saidas"), [saidas]);

  const estoqueEvolution = useMemo(() => {
    const totalAtual = estoque.reduce((acc, item) => acc + item.quantidadeTotal, 0);
    const totalEntradas = entradas.reduce((acc, item) => acc + item.quantidade, 0);
    const totalSaidas = saidas.reduce((acc, item) => acc + item.quantidade, 0);

    return [
      { periodo: "Inicial", estoque: Math.max(0, totalAtual - totalEntradas + totalSaidas) },
      { periodo: "Entradas", estoque: Math.max(0, totalAtual + totalSaidas) },
      { periodo: "Atual", estoque: totalAtual },
    ];
  }, [entradas, estoque, saidas]);

  const solicitacoesStatus = useMemo(() => {
    const status = ["pendente", "aprovada", "reprovada", "concluida"];
    return status.map((item) => ({
      name: item,
      value: solicitacoes.filter((solicitacao) => solicitacao.status === item).length,
    }));
  }, [solicitacoes]);

  const distribuicaoMedicamentos = useMemo(() => {
    return estoque
      .map((item) => {
        const medicamento = medicamentos.find((med) => med.id === item.medicamentoId);
        return {
          nome: medicamento?.nome || "Sem cadastro",
          quantidade: item.quantidadeTotal,
        };
      })
      .sort((a, b) => b.quantidade - a.quantidade)
      .slice(0, 6);
  }, [estoque, medicamentos]);

  return (
    <section className={styles.grid} aria-label="Indicadores visuais do dashboard">
      <article className={styles.chartCard}>
        <header>
          <h3>Evolução do estoque</h3>
          <span>Saldo consolidado</span>
        </header>
        <ResponsiveContainer width="100%" height={260}>
          <LineChart data={estoqueEvolution}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="periodo" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="estoque" stroke="#12824c" strokeWidth={3} dot={{ r: 5 }} />
          </LineChart>
        </ResponsiveContainer>
      </article>

      <article className={styles.chartCard}>
        <header>
          <h3>Entradas por período</h3>
          <span>Itens recebidos</span>
        </header>
        <ResponsiveContainer width="100%" height={260}>
          <BarChart data={entradasData}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="data" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="entradas" fill="#12824c" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </article>

      <article className={styles.chartCard}>
        <header>
          <h3>Saídas por período</h3>
          <span>Consumo operacional</span>
        </header>
        <ResponsiveContainer width="100%" height={260}>
          <BarChart data={saidasData}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="data" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="saidas" fill="#dc2626" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </article>

      <article className={styles.chartCard}>
        <header>
          <h3>Solicitações por status</h3>
          <span>Pipeline de aprovação</span>
        </header>
        <ResponsiveContainer width="100%" height={260}>
          <PieChart>
            <Pie data={solicitacoesStatus} dataKey="value" nameKey="name" outerRadius={88} innerRadius={48} paddingAngle={4}>
              {solicitacoesStatus.map((entry, index) => (
                <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </article>

      <article className={`${styles.chartCard} ${styles.wide}`}>
        <header>
          <h3>Distribuição dos medicamentos</h3>
          <span>Maiores volumes disponíveis</span>
        </header>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={distribuicaoMedicamentos} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" horizontal={false} />
            <XAxis type="number" />
            <YAxis type="category" dataKey="nome" width={150} />
            <Tooltip />
            <Bar dataKey="quantidade" fill="#3157c9" radius={[0, 8, 8, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </article>
    </section>
  );
}

export default DashboardCharts;
