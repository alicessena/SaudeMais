import { useMemo, useState } from "react";

import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";

import { useData } from "../../context/DataContext";

import MedicamentoModal from "../../components/MedicamentoModal";

import styles from "./Medicamentos.module.css";

function Medicamentos() {
  const {
    medicamentos,
    addMedicamento,
    updateMedicamento,
    deleteMedicamento,
  } = useData();

  const [modalOpen, setModalOpen] =
    useState(false);

  const [busca, setBusca] = useState("");

  const [editandoId, setEditandoId] =
    useState(null);

  const [form, setForm] = useState({
    nome: "",
    principioAtivo: "",
    fabricante: "",
    precoUnitario: "",
  });

  const medicamentosFiltrados =
    useMemo(() => {
      return medicamentos.filter((item) =>
        item.nome
          .toLowerCase()
          .includes(busca.toLowerCase())
      );
    }, [medicamentos, busca]);

  const abrirNovo = () => {
    setEditandoId(null);

    setForm({
      nome: "",
      principioAtivo: "",
      fabricante: "",
      precoUnitario: "",
    });

    setModalOpen(true);
  };

  const editarMedicamento = (
    medicamento
  ) => {
    setEditandoId(medicamento.id);

    setForm({
      nome: medicamento.nome,
      principioAtivo:
        medicamento.principioAtivo,
      fabricante:
        medicamento.fabricante,
      precoUnitario:
        medicamento.precoUnitario,
    });

    setModalOpen(true);
  };

  const salvarMedicamento = () => {
    const payload = {
      ...form,
      precoUnitario: Number(
        form.precoUnitario
      ),
    };

    if (editandoId) {
      updateMedicamento(
        editandoId,
        payload
      );
    } else {
      addMedicamento(payload);
    }

    setModalOpen(false);
  };

  const excluirMedicamento = (id) => {
    const confirmar = window.confirm(
      "Deseja excluir este medicamento?"
    );

    if (!confirmar) return;

    deleteMedicamento(id);
  };

  return (
    <div className={styles.container}>
      <div className={styles.topBar}>
        <div>
          <h1>Medicamentos</h1>

          <p>
            Gerencie os medicamentos do
            sistema.
          </p>
        </div>

        <button
          onClick={abrirNovo}
          className={styles.newButton}
        >
          <FaPlus />

          Novo Medicamento
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
              <th>Nome</th>
              <th>Princípio Ativo</th>
              <th>Fabricante</th>
              <th>Preço</th>
              <th>Ações</th>
            </tr>
          </thead>

          <tbody>
            {medicamentosFiltrados.map(
              (medicamento) => (
                <tr key={medicamento.id}>
                  <td>{medicamento.nome}</td>

                  <td>
                    {
                      medicamento.principioAtivo
                    }
                  </td>

                  <td>
                    <span
                      className={
                        styles.badge
                      }
                    >
                      {
                        medicamento.fabricante
                      }
                    </span>
                  </td>

                  <td>
                    R$
                    {" "}
                    {medicamento.precoUnitario.toFixed(
                      2
                    )}
                  </td>

                  <td>
                    <div
                      className={
                        styles.actions
                      }
                    >
                      <button
                        onClick={() =>
                          editarMedicamento(
                            medicamento
                          )
                        }
                      >
                        <FaEdit />
                      </button>

                      <button
                        onClick={() =>
                          excluirMedicamento(
                            medicamento.id
                          )
                        }
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>

      <MedicamentoModal
        isOpen={modalOpen}
        onClose={() =>
          setModalOpen(false)
        }
        onSubmit={salvarMedicamento}
        form={form}
        setForm={setForm}
        editando={editandoId}
      />
    </div>
  );
}

export default Medicamentos;