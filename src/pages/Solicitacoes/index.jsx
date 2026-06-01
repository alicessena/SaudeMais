import { useMemo, useState } from "react";

import {
  FaCheck,
  FaPlus,
  FaTimes,
} from "react-icons/fa";

import { useData } from "../../context/DataContext";

import SolicitacaoModal from "../../components/SolicitacaoModal";

import styles from "./Solicitacoes.module.css";

function Solicitacoes() {
  const {
    medicamentos,
    solicitacoes,
    addSolicitacao,
    aprovarSolicitacao,
    reprovarSolicitacao,
  } = useData();

  const [modalOpen, setModalOpen] =
    useState(false);

  const [busca, setBusca] =
    useState("");

  const [form, setForm] = useState({
    medicamentoId: "",
    tipoMovimento: "",
    quantidade: "",
    motivo: "",
    solicitante: "",
  });

  const solicitacoesComMedicamento =
    useMemo(() => {
      return solicitacoes.filter(
        (solicitacao) => {
          const medicamento =
            medicamentos.find(
              (med) =>
                med.id ===
                Number(
                  solicitacao.medicamentoId
                )
            );

          return medicamento?.nome
            .toLowerCase()
            .includes(
              busca.toLowerCase()
            );
        }
      );
    }, [
      solicitacoes,
      medicamentos,
      busca,
    ]);

  const criarSolicitacao = () => {
    addSolicitacao({
      ...form,
      medicamentoId: Number(
        form.medicamentoId
      ),
      quantidade: Number(
        form.quantidade
      ),
    });

    setModalOpen(false);

    setForm({
      medicamentoId: "",
      tipoMovimento: "",
      quantidade: "",
      motivo: "",
      solicitante: "",
    });
  };

  const getMedicamentoNome = (
    medicamentoId
  ) => {
    return medicamentos.find(
      (med) => med.id === medicamentoId
    )?.nome;
  };

  return (
    <div className={styles.container}>
      <div className={styles.topBar}>
        <div>
          <h1>Solicitações</h1>

          <p>
            Gerencie solicitações de
            entrada e saída.
          </p>
        </div>

        <button
          className={styles.newButton}
          onClick={() =>
            setModalOpen(true)
          }
        >
          <FaPlus />
          Nova Solicitação
        </button>
      </div>

      <input
        className={styles.search}
        placeholder="Buscar medicamento..."
        value={busca}
        onChange={(e) =>
          setBusca(e.target.value)
        }
      />

      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Medicamento</th>
              <th>Tipo</th>
              <th>Quantidade</th>
              <th>Status</th>
              <th>Ações</th>
            </tr>
          </thead>

          <tbody>
            {solicitacoesComMedicamento.map(
              (solicitacao) => (
                <tr key={solicitacao.id}>
                  <td>
                    {solicitacao.id}
                  </td>

                  <td>
                    {getMedicamentoNome(
                      solicitacao.medicamentoId
                    )}
                  </td>

                  <td>
                    {
                      solicitacao.tipoMovimento
                    }
                  </td>

                  <td>
                    {
                      solicitacao.quantidade
                    }
                  </td>

                  <td>
                    <span
                      className={
                        styles[
                          solicitacao.status
                        ]
                      }
                    >
                      {
                        solicitacao.status
                      }
                    </span>
                  </td>

                  <td>
                    {solicitacao.status ===
                      "pendente" && (
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
                          <FaCheck />
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
                          <FaTimes />
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>

      <SolicitacaoModal
        isOpen={modalOpen}
        onClose={() =>
          setModalOpen(false)
        }
        onSubmit={criarSolicitacao}
        form={form}
        setForm={setForm}
        medicamentos={medicamentos}
      />
    </div>
  );
}

export default Solicitacoes;