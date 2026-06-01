import { useMemo, useState } from "react";

import {
  FaEdit,
  FaSearch,
} from "react-icons/fa";

import { useData } from "../../context/DataContext";

import EstoqueModal from "../../components/EstoqueModal";

import styles from "./Estoque.module.css";

function Estoque() {
  const {
    estoque,
    medicamentos,
    updateEstoque,
  } = useData();

  const [busca, setBusca] =
    useState("");

  const [modalOpen, setModalOpen] =
    useState(false);

  const [editandoId, setEditandoId] =
    useState(null);

  const [form, setForm] = useState({
    quantidadeTotal: 0,
    quantidadeMinima: 0,
  });

  const estoqueComMedicamentos =
    useMemo(() => {
      return estoque
        .map(item => ({
          ...item,
          medicamento:
            medicamentos.find(
              med =>
                med.id ===
                item.medicamentoId
            ),
        }))
        .filter(item =>
          item.medicamento?.nome
            ?.toLowerCase()
            .includes(
              busca.toLowerCase()
            )
        );
    }, [
      estoque,
      medicamentos,
      busca,
    ]);

  const abrirEdicao = (item) => {
    setEditandoId(item.id);

    setForm({
      quantidadeTotal:
        item.quantidadeTotal,
      quantidadeMinima:
        item.quantidadeMinima,
    });

    setModalOpen(true);
  };

  const salvarEdicao = () => {
    updateEstoque(
      editandoId,
      form
    );

    setModalOpen(false);
  };

  return (
    <div className={styles.container}>
      <div className={styles.topBar}>
        <div>
          <h1>Estoque</h1>

          <p>
            Controle de estoque dos
            medicamentos.
          </p>
        </div>
      </div>

      <div className={styles.searchBox}>
        <FaSearch />

        <input
          placeholder="Buscar medicamento..."
          value={busca}
          onChange={(e) =>
            setBusca(
              e.target.value
            )
          }
        />
      </div>

      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Medicamento</th>
              <th>Quantidade</th>
              <th>Mínimo</th>
              <th>Status</th>
              <th>Ações</th>
            </tr>
          </thead>

          <tbody>
            {estoqueComMedicamentos.map(
              item => {
                const critico =
                  item.quantidadeTotal <=
                  item.quantidadeMinima;

                return (
                  <tr key={item.id}>
                    <td>
                      {
                        item
                          .medicamento
                          ?.nome
                      }
                    </td>

                    <td>
                      {
                        item.quantidadeTotal
                      }
                    </td>

                    <td>
                      {
                        item.quantidadeMinima
                      }
                    </td>

                    <td>
                      <span
                        className={
                          critico
                            ? styles.badgeDanger
                            : styles.badgeSuccess
                        }
                      >
                        {critico
                          ? "Crítico"
                          : "Normal"}
                      </span>
                    </td>

                    <td>
                      <button
                        className={
                          styles.editButton
                        }
                        onClick={() =>
                          abrirEdicao(
                            item
                          )
                        }
                      >
                        <FaEdit />
                      </button>
                    </td>
                  </tr>
                );
              }
            )}
          </tbody>
        </table>
      </div>

      <EstoqueModal
        isOpen={modalOpen}
        onClose={() =>
          setModalOpen(false)
        }
        onSubmit={salvarEdicao}
        form={form}
        setForm={setForm}
      />
    </div>
  );
}

export default Estoque;