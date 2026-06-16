import { useMemo, useState } from "react";
import { FaArrowUp } from "react-icons/fa";
import { Badge, Card, DataTable } from "../../components/UI";
import { useData } from "../../context/DataContext";
import styles from "./Saidas.module.css";

function Saidas() {
  const { saidas, estoque, medicamentos } = useData();
  const [busca, setBusca] = useState("");

  const saidasFormatadas = useMemo(() => {
    const termo = busca.toLowerCase();
    return saidas
      .map((saida) => {
        const estoqueItem = estoque.find((item) => Number(item.id) === Number(saida.estoqueId));
        const medicamento = medicamentos.find((med) => Number(med.id) === Number(saida.medicamentoId || estoqueItem?.medicamentoId));

        return {
          ...saida,
          medicamentoNome: medicamento?.nome || "Não encontrado",
        };
      })
      .filter((saida) =>
        `${saida.medicamentoNome} ${saida.responsavel} ${saida.motivo}`.toLowerCase().includes(termo),
      );
  }, [saidas, estoque, medicamentos, busca]);

  const totalSaidas = saidasFormatadas.reduce((acc, saida) => acc + saida.quantidade, 0);

  const columns = [
    { key: "dataAprovacao", header: "Data", sortable: true },
    { key: "medicamentoNome", header: "Medicamento", sortable: true },
    { key: "quantidade", header: "Quantidade", sortable: true },
    { key: "responsavel", header: "Responsável", sortable: true },
    { key: "motivo", header: "Motivo" },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.pageHeader}>
        <div>
          <span>Movimentações</span>
          <h1>Saídas</h1>
          <p>Histórico de consumo, distribuição e baixas aprovadas no estoque.</p>
        </div>
        <Card className={styles.summaryCard}>
          <FaArrowUp />
          <div>
            <strong>{totalSaidas}</strong>
            <span>Itens consumidos</span>
          </div>
          <Badge tone="danger">Saída</Badge>
        </Card>
      </div>

      <DataTable
        columns={columns}
        data={saidasFormatadas}
        search={busca}
        onSearch={setBusca}
        searchPlaceholder="Buscar por medicamento, responsável ou motivo..."
        emptyIcon={<FaArrowUp />}
        emptyTitle="Nenhuma saída encontrada"
      />
    </div>
  );
}

export default Saidas;
