import {
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

import { useMemo } from "react";

import { useData } from "../../context/DataContext";

import styles from "./DashboardCharts.module.css";

const COLORS = [
  "#2563eb",
  "#10b981",
  "#f59e0b",
];

function DashboardCharts() {
  const {
    entradas,
    saidas,
    estoque,
    medicamentos,
  } = useData();

  const movimentacoesData =
    useMemo(() => {
      const totalEntradas =
        entradas.reduce(
          (acc, item) =>
            acc + item.quantidade,
          0
        );

      const totalSaidas =
        saidas.reduce(
          (acc, item) =>
            acc + item.quantidade,
          0
        );

      return [
        {
          nome: "Entradas",
          quantidade:
            totalEntradas,
        },
        {
          nome: "Saídas",
          quantidade:
            totalSaidas,
        },
      ];
    }, [entradas, saidas]);

  const estoqueData =
    useMemo(() => {
      let normal = 0;
      let baixo = 0;
      let critico = 0;

      estoque.forEach((item) => {
        if (
          item.quantidadeTotal <=
          item.quantidadeMinima
        ) {
          critico++;
        } else if (
          item.quantidadeTotal <=
          item.quantidadeMinima *
            1.5
        ) {
          baixo++;
        } else {
          normal++;
        }
      });

      return [
        {
          name: "Normal",
          value: normal,
        },
        {
          name: "Baixo",
          value: baixo,
        },
        {
          name: "Crítico",
          value: critico,
        },
      ];
    }, [estoque]);

  const topMedicamentos =
    useMemo(() => {
      return estoque
        .map((item) => {
          const medicamento =
            medicamentos.find(
              (med) =>
                med.id ===
                item.medicamentoId
            );

          return {
            nome:
              medicamento?.nome ||
              "Desconhecido",

            quantidade:
              item.quantidadeTotal,
          };
        })
        .sort(
          (a, b) =>
            b.quantidade -
            a.quantidade
        )
        .slice(0, 5);
    }, [
      estoque,
      medicamentos,
    ]);

  return (
    <div className={styles.grid}>
      <div className={styles.chartCard}>
        <h3>
          Movimentações
        </h3>

        <ResponsiveContainer
          width="100%"
          height={300}
        >
          <BarChart
            data={
              movimentacoesData
            }
          >
            <CartesianGrid
              strokeDasharray="3 3"
            />

            <XAxis
              dataKey="nome"
            />

            <YAxis />

            <Tooltip />

            <Bar
              dataKey="quantidade"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className={styles.chartCard}>
        <h3>
          Situação do Estoque
        </h3>

        <ResponsiveContainer
          width="100%"
          height={300}
        >
          <PieChart>
            <Pie
              data={
                estoqueData
              }
              dataKey="value"
              outerRadius={100}
              label
            >
              {estoqueData.map(
                (
                  entry,
                  index
                ) => (
                  <Cell
                    key={
                      index
                    }
                    fill={
                      COLORS[
                        index
                      ]
                    }
                  />
                )
              )}
            </Pie>

            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div
        className={
          styles.chartCard
        }
      >
        <h3>
          Top Medicamentos
        </h3>

        <ResponsiveContainer
          width="100%"
          height={300}
        >
          <BarChart
            data={
              topMedicamentos
            }
            layout="vertical"
          >
            <CartesianGrid
              strokeDasharray="3 3"
            />

            <XAxis
              type="number"
            />

            <YAxis
              type="category"
              dataKey="nome"
            />

            <Tooltip />

            <Bar
              dataKey="quantidade"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default DashboardCharts;