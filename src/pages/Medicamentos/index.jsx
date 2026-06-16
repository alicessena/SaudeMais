import { useMemo, useState } from "react";
import { FaEdit, FaPills, FaPlus, FaTrash } from "react-icons/fa";
import { Badge, Button, DataTable } from "../../components/UI";
import MedicamentoModal from "../../components/MedicamentoModal";
import { useData } from "../../context/DataContext";
import styles from "./Medicamentos.module.css";

function Medicamentos() {
  const { medicamentos, addMedicamento, updateMedicamento, deleteMedicamento } = useData();
  const [modalOpen, setModalOpen] = useState(false);
  const [busca, setBusca] = useState("");
  const [editandoId, setEditandoId] = useState(null);
  const [form, setForm] = useState({
    nome: "",
    principioAtivo: "",
    fabricante: "",
    precoUnitario: "",
  });

  const medicamentosFiltrados = useMemo(() => {
    const termo = busca.toLowerCase();
    return medicamentos.filter((item) =>
      `${item.nome} ${item.principioAtivo} ${item.fabricante}`.toLowerCase().includes(termo),
    );
  }, [medicamentos, busca]);

  const abrirNovo = () => {
    setEditandoId(null);
    setForm({ nome: "", principioAtivo: "", fabricante: "", precoUnitario: "" });
    setModalOpen(true);
  };

  const editarMedicamento = (medicamento) => {
    setEditandoId(medicamento.id);
    setForm({
      nome: medicamento.nome,
      principioAtivo: medicamento.principioAtivo,
      fabricante: medicamento.fabricante,
      precoUnitario: medicamento.precoUnitario,
    });
    setModalOpen(true);
  };

  const salvarMedicamento = () => {
    const payload = { ...form, precoUnitario: Number(form.precoUnitario) };
    if (editandoId) updateMedicamento(editandoId, payload);
    else addMedicamento(payload);
    setModalOpen(false);
  };

  const excluirMedicamento = (id) => {
    if (window.confirm("Deseja excluir este medicamento?")) {
      deleteMedicamento(id);
    }
  };

  const columns = [
    { key: "nome", header: "Nome", sortable: true },
    { key: "principioAtivo", header: "Princípio ativo", sortable: true },
    {
      key: "fabricante",
      header: "Fabricante",
      sortable: true,
      render: (item) => <Badge tone="info">{item.fabricante}</Badge>,
    },
    {
      key: "precoUnitario",
      header: "Preço",
      sortable: true,
      render: (item) =>
        item.precoUnitario.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        }),
    },
    {
      key: "acoes",
      header: "Ações",
      isActions: true,
      render: (item) => (
        <div className={styles.rowActions}>
          <Button variant="ghost" iconOnly aria-label={`Editar ${item.nome}`} onClick={() => editarMedicamento(item)}>
            <FaEdit />
          </Button>
          <Button variant="danger" iconOnly aria-label={`Excluir ${item.nome}`} onClick={() => excluirMedicamento(item.id)}>
            <FaTrash />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.pageHeader}>
        <div>
          <span>Catálogo clínico</span>
          <h1>Medicamentos</h1>
          <p>Gerencie medicamentos, fabricantes e preços unitários com uma base limpa para o estoque.</p>
        </div>
      </div>

      <DataTable
        columns={columns}
        data={medicamentosFiltrados}
        search={busca}
        onSearch={setBusca}
        searchPlaceholder="Buscar por nome, princípio ativo ou fabricante..."
        emptyIcon={<FaPills />}
        emptyTitle="Nenhum medicamento encontrado"
        actions={
          <Button onClick={abrirNovo}>
            <FaPlus />
            Novo medicamento
          </Button>
        }
      />

      <MedicamentoModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={salvarMedicamento}
        form={form}
        setForm={setForm}
        editando={editandoId}
      />
    </div>
  );
}

export default Medicamentos;
