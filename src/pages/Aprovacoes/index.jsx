import { useMemo } from "react";

import {
  FaCheckCircle,
  FaTimesCircle,
  FaClipboardCheck,
} from "react-icons/fa";

import { useData } from "../../context/DataContext";

import styles from "./Aprovacoes.module.css";

function Aprovacoes() {
  const {
    solicitacoes,
    medicamentos,
    aprovarSolicitacao,
    reprovarSolicitacao,
  } = useData();

  const pendentes = useMemo(() => {
    return solicitacoes.filter(
      (solicitacao) =>
        solicitacao.status === "pendente"
    );
  }, [solicitacoes]);

  const getMedicamento = (
    medicamentoId
  ) => {
    return medicamentos.find(
      (medicamento) =>
        medicamento.id === medicamentoId
    );
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <h1>Central de Aprovações</h1>

          <p>
            Solicitações aguardando análise.
          </p>
        </div>

        <div className={styles.counter}>
          <FaClipboardCheck />

          <span>
            {pendentes.length}
            {" "}
            Pendentes
          </span>
        </div>
      </div>

      {pendentes.length === 0 ? (
        <div className={styles.empty}>
          <h3>
            Nenhuma solicitação pendente
          </h3>

          <p>
            Todas as solicitações já foram
            analisadas.
          </p>
        </div>
      ) : (
        <div className={styles.cards}>
          {pendentes.map(
            (solicitacao) => {
              const medicamento =
                getMedicamento(
                  solicitacao.medicamentoId
                );

              return (
                <div
                  key={solicitacao.id}
                  className={styles.card}
                >
                  <div
                    className={
                      styles.cardHeader
                    }
                  >
                    <span
                      className={
                        styles.id
                      }
                    >
                      {
                        solicitacao.id
                      }
                    </span>

                    <span
                      className={
                        styles.status
                      }
                    >
                      Pendente
                    </span>
                  </div>

                  <h3>
                    {
                      medicamento?.nome
                    }
                  </h3>

                  <div
                    className={
                      styles.info
                    }
                  >
                    <p>
                      <strong>
                        Tipo:
                      </strong>
                      {" "}
                      {
                        solicitacao.tipoMovimento
                      }
                    </p>

                    <p>
                      <strong>
                        Quantidade:
                      </strong>
                      {" "}
                      {
                        solicitacao.quantidade
                      }
                    </p>

                    <p>
                      <strong>
                        Solicitante:
                      </strong>
                      {" "}
                      {
                        solicitacao.solicitante
                      }
                    </p>

                    <p>
                      <strong>
                        Data:
                      </strong>
                      {" "}
                      {
                        solicitacao.dataSolicitacao
                      }
                    </p>
                  </div>

                  <div
                    className={
                      styles.motivo
                    }
                  >
                    {
                      solicitacao.motivo
                    }
                  </div>

                  <div
                    className={
                      styles.actions
                    }
                  >
                    <button
                      className={
                        styles.approve
                      }
                      onClick={() =>
                        aprovarSolicitacao(
                          solicitacao.id
                        )
                      }
                    >
                      <FaCheckCircle />

                      Aprovar
                    </button>

                    <button
                      className={
                        styles.reject
                      }
                      onClick={() =>
                        reprovarSolicitacao(
                          solicitacao.id
                        )
                      }
                    >
                      <FaTimesCircle />

                      Reprovar
                    </button>
                  </div>
                </div>
              );
            }
          )}
        </div>
      )}
    </div>
  );
}

export default Aprovacoes;