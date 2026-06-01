import { useMemo, useState } from "react";

import {
  FaBoxOpen,
  FaSearch,
} from "react-icons/fa";

import { useData } from "../../context/DataContext";

import styles from "./Entradas.module.css";

function Entradas() {
  const {
    entradas,
    estoque,
    medicamentos,
  } = useData();

  const [busca, setBusca] =
    useState("");

  const entradasFormatadas =
    useMemo(() => {
      return entradas
        .map((entrada) => {
          const estoqueItem =
            estoque.find(
              (item) =>
                item.id ===
                entrada.estoqueId
            );

          const medicamento =
            medicamentos.find(
              (med) =>
                med.id ===
                estoqueItem?.medicamentoId
            );

          return {
            ...entrada,
            medicamentoNome:
              medicamento?.nome ||
              "Não encontrado",
          };
        })
        .filter((entrada) =>
          entrada.medicamentoNome
            .toLowerCase()
            .includes(
              busca.toLowerCase()
            )
        );
    }, [
      entradas,
      estoque,
      medicamentos,
      busca,
    ]);

  const totalEntradas =
    entradasFormatadas.reduce(
      (acc, entrada) =>
        acc + entrada.quantidade,
      0
    );

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <h1>Entradas</h1>

          <p>
            Histórico de entradas
            aprovadas.
          </p>
        </div>

        <div className={styles.card}>
          <FaBoxOpen />

          <div>
            <strong>
              {totalEntradas}
            </strong>

            <span>
              Itens Recebidos
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
              <th>Fornecedor</th>
              <th>Solicitante</th>
              <th>Motivo</th>
            </tr>
          </thead>

          <tbody>
            {entradasFormatadas.map(
              (entrada) => (
                <tr key={entrada.id}>
                  <td>
                    {
                      entrada.dataAprovacao
                    }
                  </td>

                  <td>
                    {
                      entrada.medicamentoNome
                    }
                  </td>

                  <td>
                    {
                      entrada.quantidade
                    }
                  </td>

                  <td>
                    {
                      entrada.fornecedor
                    }
                  </td>

                  <td>
                    {
                      entrada.solicitante
                    }
                  </td>

                  <td>
                    {entrada.motivo}
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

export default Entradas;