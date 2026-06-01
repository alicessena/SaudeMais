import { useData } from "../../context/DataContext";
import DashboardCharts
from "../../components/DashboardCharts";
import {
  FaPills,
  FaBoxes,
  FaClipboardList,
  FaExclamationTriangle,
} from "react-icons/fa";

import styles from "./Dashboard.module.css";

function Dashboard() {
  const {
    medicamentos,
    estoque,
    solicitacoes,
  } = useData();

  const estoqueCritico = estoque.filter(
    item => item.quantidadeTotal <= item.quantidadeMinima
  );

  const solicitacoesPendentes = solicitacoes.filter(
    item => item.status === "pendente"
  );

  const estoqueTotal = estoque.reduce(
    (total, item) => total + item.quantidadeTotal,
    0
  );

  const buscarMedicamento = (medicamentoId) => {
    return medicamentos.find(
      med => med.id === medicamentoId
    );
  };


  return (
    <div className={styles.container}>
      <div className={styles.welcome}>
        <h2>Visão Geral do Sistema</h2>

        <p>
          Acompanhe o estoque, solicitações e
          movimentações da farmácia.
        </p>
      </div>

      <section className={styles.cards}>
        <div className={styles.card}>
          <div className={styles.cardIcon}>
            <FaPills />
          </div>

          <div>
            <h3>{medicamentos.length}</h3>
            <p>Medicamentos Cadastrados</p>
          </div>
        </div>

        <div className={styles.card}>
          <div className={styles.cardIcon}>
            <FaBoxes />
          </div>

          <div>
            <h3>{estoqueTotal}</h3>
            <p>Itens em Estoque</p>
          </div>
        </div>

        <div className={styles.card}>
          <div className={styles.cardIcon}>
            <FaClipboardList />
          </div>

          <div>
            <h3>{solicitacoesPendentes.length}</h3>
            <p>Solicitações Pendentes</p>
          </div>
        </div>

        <div className={styles.cardAlert}>
          <div className={styles.cardIcon}>
            <FaExclamationTriangle />
          </div>

          <div>
            <h3>{estoqueCritico.length}</h3>
            <p>Alertas de Estoque</p>
          </div>
        </div>
      </section>

      <DashboardCharts />

      <section className={styles.contentGrid}>
        <div className={styles.alerts}>
          <div className={styles.sectionHeader}>
            <h3>Estoque Crítico</h3>
          </div>

          {estoqueCritico.length === 0 ? (
            <p className={styles.empty}>
              Nenhum medicamento com estoque baixo.
            </p>
          ) : (
            estoqueCritico.map((item) => {
              const medicamento =
                buscarMedicamento(item.medicamentoId);

              return (
                <div
                  key={item.id}
                  className={styles.alertItem}
                >
                  <h4>
                    {medicamento?.nome}
                  </h4>

                  <span>
                    Estoque Atual:
                    {" "}
                    {item.quantidadeTotal}
                  </span>

                  <span>
                    Mínimo:
                    {" "}
                    {item.quantidadeMinima}
                  </span>
                </div>
              );
            })
          )}
        </div>

        <div className={styles.stats}>
          <div className={styles.sectionHeader}>
            <h3>Estatísticas</h3>
          </div>

          <div className={styles.statRow}>
            <span>Pendentes</span>

            <strong>
              {
                solicitacoes.filter(
                  s => s.status === "pendente"
                ).length
              }
            </strong>
          </div>

          <div className={styles.statRow}>
            <span>Aprovadas</span>

            <strong>
              {
                solicitacoes.filter(
                  s => s.status === "aprovada"
                ).length
              }
            </strong>
          </div>

          <div className={styles.statRow}>
            <span>Reprovadas</span>

            <strong>
              {
                solicitacoes.filter(
                  s => s.status === "reprovada"
                ).length
              }
            </strong>
          </div>

          <div className={styles.statRow}>
            <span>Concluídas</span>

            <strong>
              {
                solicitacoes.filter(
                  s => s.status === "concluida"
                ).length
              }
            </strong>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Dashboard;