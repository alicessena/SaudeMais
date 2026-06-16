import { useMemo, useState } from "react";
import { FaBoxOpen } from "react-icons/fa";
import { Badge, Card, DataTable } from "../../components/UI";
import { useData } from "../../context/DataContext";
import styles from "./Entradas.module.css";

function Entradas() {
  const { entradas, estoque, medicamentos } = useData();
  const [busca, setBusca] = useState("");

  const entradasFormatadas = useMemo(() => {
    const termo = busca.toLowerCase();
    return entradas
      .map((entrada) => {
        const estoqueItem = estoque.find((item) => item.id === entrada.estoqueId);
        const medicamento = medicamentos.find((med) => med.id === estoqueItem?.medicamentoId);
        return {
          ...entrada,
          medicamentoNome: medicamento?.nome || "Não encontrado",
        };
      })
      .filter((entrada) =>
        `${entrada.medicamentoNome} ${entrada.fornecedor} ${entrada.solicitante} ${entrada.motivo}`.toLowerCase().includes(termo),
      );
  }, [entradas, estoque, medicamentos, busca]);

  const totalEntradas = entradasFormatadas.reduce((acc, entrada) => acc + entrada.quantidade, 0);

  const columns = [
    { key: "dataAprovacao", header: "Data", sortable: true },
    { key: "medicamentoNome", header: "Medicamento", sortable: true },
    { key: "quantidade", header: "Quantidade", sortable: true },
    { key: "fornecedor", header: "Fornecedor", sortable: true },
    { key: "solicitante", header: "Solicitante", sortable: true },
    { key: "motivo", header: "Motivo" },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.pageHeader}>
        <div>
          <span>Movimentações</span>
          <h1>Entradas</h1>
          <p>Histórico de recebimentos aprovados e impacto operacional no estoque.</p>
        </div>
        <Card className={styles.summaryCard}>
          <FaBoxOpen />
          <div>
            <strong>{totalEntradas}</strong>
            <span>Itens recebidos</span>
          </div>
          <Badge tone="success">Entrada</Badge>
        </Card>
      </div>

      <DataTable
        columns={columns}
        data={entradasFormatadas}
        search={busca}
        onSearch={setBusca}
        searchPlaceholder="Buscar por medicamento, fornecedor, solicitante ou motivo..."
        emptyIcon={<FaBoxOpen />}
        emptyTitle="Nenhuma entrada encontrada"
      />
    </div>
  );
}

export default Entradas;
