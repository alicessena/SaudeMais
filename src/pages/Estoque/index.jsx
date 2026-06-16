import { useMemo, useState } from "react";
import { FaBoxes, FaEdit } from "react-icons/fa";
import { Badge, Button, DataTable } from "../../components/UI";
import EstoqueModal from "../../components/EstoqueModal";
import { useData } from "../../context/DataContext";
import styles from "./Estoque.module.css";

function Estoque() {
  const { estoque, medicamentos, updateEstoque } = useData();
  const [busca, setBusca] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editandoId, setEditandoId] = useState(null);
  const [form, setForm] = useState({ quantidadeTotal: 0, quantidadeMinima: 0 });

  const estoqueComMedicamentos = useMemo(() => {
    const termo = busca.toLowerCase();
    return estoque
      .map((item) => ({
        ...item,
        medicamento: medicamentos.find((med) => med.id === item.medicamentoId),
      }))
      .filter((item) => `${item.medicamento?.nome || ""}`.toLowerCase().includes(termo));
  }, [estoque, medicamentos, busca]);

  const abrirEdicao = (item) => {
    setEditandoId(item.id);
    setForm({
      quantidadeTotal: item.quantidadeTotal,
      quantidadeMinima: item.quantidadeMinima,
    });
    setModalOpen(true);
  };

  const salvarEdicao = () => {
    updateEstoque(editandoId, form);
    setModalOpen(false);
  };

  const columns = [
    {
      key: "medicamento",
      header: "Medicamento",
      sortable: true,
      sortValue: (item) => item.medicamento?.nome,
      render: (item) => item.medicamento?.nome || "Não encontrado",
    },
    { key: "quantidadeTotal", header: "Quantidade", sortable: true },
    { key: "quantidadeMinima", header: "Mínimo", sortable: true },
    {
      key: "status",
      header: "Status",
      sortable: true,
      sortValue: (item) => (item.quantidadeTotal <= item.quantidadeMinima ? "Crítico" : "Normal"),
      render: (item) => {
        const critico = item.quantidadeTotal <= item.quantidadeMinima;
        return <Badge tone={critico ? "danger" : "success"}>{critico ? "Crítico" : "Normal"}</Badge>;
      },
    },
    {
      key: "acoes",
      header: "Ações",
      isActions: true,
      render: (item) => (
        <Button variant="ghost" iconOnly aria-label={`Editar estoque de ${item.medicamento?.nome}`} onClick={() => abrirEdicao(item)}>
          <FaEdit />
        </Button>
      ),
    },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.pageHeader}>
        <div>
          <span>Controle operacional</span>
          <h1>Estoque</h1>
          <p>Monitore saldos, pontos mínimos e itens que exigem reposição imediata.</p>
        </div>
      </div>

      <DataTable
        columns={columns}
        data={estoqueComMedicamentos}
        search={busca}
        onSearch={setBusca}
        searchPlaceholder="Buscar medicamento no estoque..."
        emptyIcon={<FaBoxes />}
        emptyTitle="Nenhum item de estoque encontrado"
      />

      <EstoqueModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={salvarEdicao}
        form={form}
        setForm={setForm}
      />
    </div>
  );
}

export default Estoque;
