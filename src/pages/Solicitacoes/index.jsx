import { useMemo, useState } from "react";
import { FaCheck, FaClipboardList, FaPlus, FaTimes } from "react-icons/fa";
import { Badge, Button, DataTable } from "../../components/UI";
import SolicitacaoModal from "../../components/SolicitacaoModal";
import { useData } from "../../context/DataContext";
import styles from "./Solicitacoes.module.css";

const statusTone = {
  pendente: "warning",
  aprovada: "success",
  reprovada: "danger",
  concluida: "info",
};

function Solicitacoes() {
  const { medicamentos, solicitacoes, addSolicitacao, aprovarSolicitacao, reprovarSolicitacao } = useData();
  const [modalOpen, setModalOpen] = useState(false);
  const [busca, setBusca] = useState("");
  const [form, setForm] = useState({
    medicamentoId: "",
    tipoMovimento: "",
    quantidade: "",
    motivo: "",
    solicitante: "",
  });

  const solicitacoesComMedicamento = useMemo(() => {
    const termo = busca.toLowerCase();
    return solicitacoes
      .map((solicitacao) => ({
        ...solicitacao,
        medicamentoNome:
          medicamentos.find((med) => med.id === Number(solicitacao.medicamentoId))?.nome || "Não encontrado",
      }))
      .filter((solicitacao) =>
        `${solicitacao.id} ${solicitacao.medicamentoNome} ${solicitacao.solicitante} ${solicitacao.status}`
          .toLowerCase()
          .includes(termo),
      );
  }, [busca, medicamentos, solicitacoes]);

  const criarSolicitacao = () => {
    addSolicitacao({
      ...form,
      medicamentoId: Number(form.medicamentoId),
      quantidade: Number(form.quantidade),
    });

    setModalOpen(false);
    setForm({ medicamentoId: "", tipoMovimento: "", quantidade: "", motivo: "", solicitante: "" });
  };

  const columns = [
    { key: "id", header: "ID", sortable: true },
    { key: "medicamentoNome", header: "Medicamento", sortable: true },
    {
      key: "tipoMovimento",
      header: "Tipo",
      sortable: true,
      render: (item) => <Badge tone={item.tipoMovimento === "entrada" ? "success" : "info"}>{item.tipoMovimento}</Badge>,
    },
    { key: "quantidade", header: "Quantidade", sortable: true },
    {
      key: "status",
      header: "Status",
      sortable: true,
      render: (item) => <Badge tone={statusTone[item.status] || "neutral"}>{item.status}</Badge>,
    },
    {
      key: "acoes",
      header: "Ações",
      isActions: true,
      render: (item) =>
        item.status === "pendente" ? (
          <div className={styles.rowActions}>
            <Button variant="secondary" iconOnly aria-label={`Aprovar ${item.id}`} onClick={() => aprovarSolicitacao(item.id)}>
              <FaCheck />
            </Button>
            <Button variant="danger" iconOnly aria-label={`Reprovar ${item.id}`} onClick={() => reprovarSolicitacao(item.id)}>
              <FaTimes />
            </Button>
          </div>
        ) : (
          <span className={styles.muted}>Finalizada</span>
        ),
    },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.pageHeader}>
        <div>
          <span>Workflow</span>
          <h1>Solicitações</h1>
          <p>Cadastre, acompanhe e aprove solicitações de entrada e saída de medicamentos.</p>
        </div>
      </div>

      <DataTable
        columns={columns}
        data={solicitacoesComMedicamento}
        search={busca}
        onSearch={setBusca}
        searchPlaceholder="Buscar por ID, medicamento, solicitante ou status..."
        emptyIcon={<FaClipboardList />}
        emptyTitle="Nenhuma solicitação encontrada"
        actions={
          <Button onClick={() => setModalOpen(true)}>
            <FaPlus />
            Nova solicitação
          </Button>
        }
      />

      <SolicitacaoModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={criarSolicitacao}
        form={form}
        setForm={setForm}
        medicamentos={medicamentos}
      />
    </div>
  );
}

export default Solicitacoes;
