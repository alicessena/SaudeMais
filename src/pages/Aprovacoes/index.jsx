import { useMemo } from "react";
import { FaCheckCircle, FaClipboardCheck, FaTimesCircle } from "react-icons/fa";
import { Badge, Button, Card, EmptyState } from "../../components/UI";
import { useData } from "../../context/DataContext";
import styles from "./Aprovacoes.module.css";

function Aprovacoes() {
  const { solicitacoes, medicamentos, aprovarSolicitacao, reprovarSolicitacao } = useData();

  const pendentes = useMemo(
    () => solicitacoes.filter((solicitacao) => solicitacao.status === "pendente"),
    [solicitacoes],
  );

  const getMedicamento = (medicamentoId) => medicamentos.find((medicamento) => medicamento.id === medicamentoId);

  return (
    <div className={styles.container}>
      <div className={styles.pageHeader}>
        <div>
          <span>Governança</span>
          <h1>Central de Aprovações</h1>
          <p>Analise solicitações pendentes com contexto suficiente para aprovar ou reprovar rapidamente.</p>
        </div>
        <Card className={styles.counter}>
          <FaClipboardCheck />
          <div>
            <strong>{pendentes.length}</strong>
            <span>Pendentes</span>
          </div>
        </Card>
      </div>

      {pendentes.length === 0 ? (
        <EmptyState
          icon={<FaClipboardCheck />}
          title="Nenhuma solicitação pendente"
          description="Todas as solicitações já foram analisadas."
        />
      ) : (
        <div className={styles.cards}>
          {pendentes.map((solicitacao) => {
            const medicamento = getMedicamento(solicitacao.medicamentoId);

            return (
              <Card key={solicitacao.id} className={styles.card}>
                <div className={styles.cardHeader}>
                  <span className={styles.id}>{solicitacao.id}</span>
                  <Badge tone="warning">Pendente</Badge>
                </div>

                <h3>{medicamento?.nome || "Medicamento não encontrado"}</h3>

                <div className={styles.info}>
                  <p>
                    <strong>Tipo</strong>
                    <span>{solicitacao.tipoMovimento}</span>
                  </p>
                  <p>
                    <strong>Quantidade</strong>
                    <span>{solicitacao.quantidade}</span>
                  </p>
                  <p>
                    <strong>Solicitante</strong>
                    <span>{solicitacao.solicitante}</span>
                  </p>
                  <p>
                    <strong>Data</strong>
                    <span>{solicitacao.dataSolicitacao}</span>
                  </p>
                </div>

                <div className={styles.motivo}>{solicitacao.motivo}</div>

                <div className={styles.actions}>
                  <Button variant="secondary" onClick={() => aprovarSolicitacao(solicitacao.id)}>
                    <FaCheckCircle />
                    Aprovar
                  </Button>
                  <Button variant="danger" onClick={() => reprovarSolicitacao(solicitacao.id)}>
                    <FaTimesCircle />
                    Reprovar
                  </Button>
                </div>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default Aprovacoes;
