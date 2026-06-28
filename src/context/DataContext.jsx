/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState } from "react";
import { notificationService }
from "../services/notificationService";
import {
  localStorageService,
  STORAGE_KEYS,
} from "../services/localStorageService";

const DataContext = createContext();

const createId = () => Date.now();
const createSolicitacaoId = () => `SOL${Date.now()}`;
const createISODate = () => new Date().toISOString().split("T")[0];

export function DataProvider({ children }) {
  const [medicamentos, setMedicamentosState] = useState(() =>
    localStorageService.get(STORAGE_KEYS.MEDICAMENTOS),
  );

  const [estoque, setEstoqueState] = useState(() =>
    localStorageService.get(STORAGE_KEYS.ESTOQUE),
  );

  const [solicitacoes, setSolicitacoesState] = useState(() =>
    localStorageService.get(STORAGE_KEYS.SOLICITACOES),
  );

  const [entradas, setEntradasState] = useState(() =>
    localStorageService.get(STORAGE_KEYS.ENTRADAS),
  );

  const [saidas, setSaidasState] = useState(() =>
    localStorageService.get(STORAGE_KEYS.SAIDAS),
  );

  const setMedicamentos = (data) => {
    setMedicamentosState(data);

    localStorageService.set(STORAGE_KEYS.MEDICAMENTOS, data);
  };

  const setEstoque = (data) => {
    setEstoqueState(data);

    localStorageService.set(STORAGE_KEYS.ESTOQUE, data);
  };

  const setSolicitacoes = (data) => {
    setSolicitacoesState(data);

    localStorageService.set(STORAGE_KEYS.SOLICITACOES, data);
  };

  const setEntradas = (data) => {
    setEntradasState(data);

    localStorageService.set(STORAGE_KEYS.ENTRADAS, data);
  };

  const setSaidas = (data) => {
    setSaidasState(data);

    localStorageService.set(STORAGE_KEYS.SAIDAS, data);
  };

const addMedicamento = (novoMedicamento) => {
  const medicamento = {
    ...novoMedicamento,
    id: createId(),
  };

  setMedicamentos([
    ...medicamentos,
    medicamento,
  ]);

  notificationService.medicamentoCriado();
};

const updateMedicamento = (
  id,
  medicamentoAtualizado
) => {
  const atualizados =
    medicamentos.map(
      (medicamento) =>
        medicamento.id === id
          ? {
              ...medicamento,
              ...medicamentoAtualizado,
            }
          : medicamento
    );

  setMedicamentos(
    atualizados
  );

  notificationService.medicamentoAtualizado();
};

const deleteMedicamento = (id) => {
  const atualizados =
    medicamentos.filter(
      (medicamento) =>
        medicamento.id !== id
    );

  setMedicamentos(
    atualizados
  );

  notificationService.medicamentoRemovido();
};

const updateEstoque = (
  id,
  estoqueAtualizado
) => {
  const atualizados =
    estoque.map((item) =>
      item.id === id
        ? {
            ...item,
            ...estoqueAtualizado,
          }
        : item
    );

  setEstoque(
    atualizados
  );

  notificationService.estoqueAtualizado();
};

const addSolicitacao = (
  novaSolicitacao
) => {
  const solicitacao = {
    id: createSolicitacaoId(),
    status: "pendente",

    dataSolicitacao:
      createISODate(),

    responsavel: null,

    ...novaSolicitacao,
  };

  setSolicitacoes([
    ...solicitacoes,
    solicitacao,
  ]);

  notificationService.solicitacaoCriada();
};

const aprovarSolicitacao = (
  solicitacaoId
) => {
  const solicitacao =
    solicitacoes.find(
      (s) =>
        s.id === solicitacaoId
    );

  if (!solicitacao) {
    notificationService.erroSistema();
    return;
  }

  const estoqueItem =
    estoque.find(
      (item) =>
        Number(
          item.medicamentoId
        ) ===
        Number(
          solicitacao.medicamentoId
        )
    );

  if (!estoqueItem) {
    notificationService.error(
      "Medicamento não encontrado no estoque."
    );
    return;
  }

  if (
    solicitacao.tipoMovimento ===
      "saida" &&
    estoqueItem.quantidadeTotal <
      solicitacao.quantidade
  ) {
    notificationService.estoqueInsuficiente();
    return;
  }

  const solicitacoesAtualizadas =
    solicitacoes.map((s) =>
      s.id === solicitacaoId
        ? {
            ...s,
            status: "concluida",
            responsavel:
              "Administrador",
          }
        : s
    );

  setSolicitacoes(
    solicitacoesAtualizadas
  );

  atualizarEstoque(
    solicitacao.medicamentoId,
    solicitacao.quantidade,
    solicitacao.tipoMovimento
  );

  if (
    solicitacao.tipoMovimento ===
    "entrada"
  ) {
    setEntradas([
      ...entradas,
      {
        id: createId(),

        estoqueId:
          estoqueItem.id,

        quantidade:
          solicitacao.quantidade,

        motivo:
          solicitacao.motivo,

        fornecedor:
          "Fornecedor Padrão",

        solicitante:
          solicitacao.solicitante,

        dataAprovacao:
          createISODate(),
      },
    ]);

    notificationService.entradaRegistrada();
  } else {
    setSaidas([
      ...saidas,
      {
        id: createId(),

        estoqueId:
          estoqueItem.id,

        quantidade:
          solicitacao.quantidade,

        motivo:
          solicitacao.motivo,

        responsavel:
          "Administrador",

        dataAprovacao:
          createISODate(),
      },
    ]);

    notificationService.saidaRegistrada();
  }

  notificationService.solicitacaoAprovada();
};

const reprovarSolicitacao = (
  solicitacaoId
) => {
  const atualizadas =
    solicitacoes.map((s) =>
      s.id === solicitacaoId
        ? {
            ...s,
            status: "reprovada",
            responsavel:
              "Administrador",
          }
        : s
    );

  setSolicitacoes(
    atualizadas
  );

  notificationService.solicitacaoReprovada();
};

const atualizarEstoque = (
  medicamentoId,
  quantidade,
  tipo
) => {
  const atualizado =
    estoque.map((item) => {
      if (
        Number(
          item.medicamentoId
        ) !==
        Number(medicamentoId)
      ) {
        return item;
      }

      return {
        ...item,

        quantidadeTotal:
          tipo === "entrada"
            ? item.quantidadeTotal +
              quantidade
            : item.quantidadeTotal -
              quantidade,
      };
    });

  setEstoque(atualizado);
};

  const value = {
    medicamentos,
    setMedicamentos,

    addMedicamento,
    updateMedicamento,
    deleteMedicamento,

    estoque,
    setEstoque,
    atualizarEstoque,
    updateEstoque,

    solicitacoes,
    setSolicitacoes,
    addSolicitacao,
aprovarSolicitacao,
reprovarSolicitacao,

    entradas,
    setEntradas,

    saidas,
    setSaidas,
    
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}

export function useData() {
  return useContext(DataContext);
}
