import { useMemo, useState } from "react";

import {
  FaArrowUp,
  FaSearch,
} from "react-icons/fa";

import { useData } from "../../context/DataContext";

import styles from "./Saidas.module.css";

function Saidas() {
  const {
    saidas,
    estoque,
    medicamentos,
  } = useData();

  const [busca, setBusca] =
    useState("");

  const saidasFormatadas =
    useMemo(() => {
      return saidas
        .map((saida) => {
          let medicamento;

          if (saida.medicamentoId) {
            medicamento =
              medicamentos.find(
                (med) =>
                  Number(med.id) ===
                  Number(
                    saida.medicamentoId
                  )
              );
          } else {
            const estoqueItem =
              estoque.find(
                (item) =>
                  Number(item.id) ===
                  Number(
                    saida.estoqueId
                  )
              );

            medicamento =
              medicamentos.find(
                (med) =>
                  Number(med.id) ===
                  Number(
                    estoqueItem?.medicamentoId
                  )
              );
          }

          return {
            ...saida,
            medicamentoNome:
              medicamento?.nome ||
              "Não encontrado",
          };
        })
        .filter((saida) =>
          saida.medicamentoNome
            .toLowerCase()
            .includes(
              busca.toLowerCase()
            )
        );
    }, [
      saidas,
      estoque,
      medicamentos,
      busca,
    ]);

  const totalSaidas =
    saidasFormatadas.reduce(
      (acc, saida) =>
        acc + saida.quantidade,
      0
    );

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <h1>Saídas</h1>

          <p>
            Histórico de consumo e
            distribuição de medicamentos.
          </p>
        </div>

        <div className={styles.card}>
          <FaArrowUp />

          <div>
            <strong>
              {totalSaidas}
            </strong>

            <span>
              Itens Consumidos
            </span>
          </div>
        </div>
      </div>

      <div className={styles.searchBox}>
        <FaSearch />

        <input
          type="text"
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
              <th>Data</th>
              <th>Medicamento</th>
              <th>Quantidade</th>
              <th>Responsável</th>
              <th>Motivo</th>
            </tr>
          </thead>

          <tbody>
            {saidasFormatadas.map(
              (saida) => (
                <tr key={saida.id}>
                  <td>
                    {
                      saida.dataAprovacao
                    }
                  </td>

                  <td>
                    {
                      saida.medicamentoNome
                    }
                  </td>

                  <td>
                    {
                      saida.quantidade
                    }
                  </td>

                  <td>
                    {
                      saida.responsavel
                    }
                  </td>

                  <td>
                    {saida.motivo}
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Saidas;