import medicamentosData from "../data/medicamentos.json";
import estoqueData from "../data/estoque.json";
import solicitacoesData from "../data/solicitacoes.json";
import entradasData from "../data/entradas.json";
import saidasData from "../data/saidas.json";

const STORAGE_KEYS = {
  MEDICAMENTOS: "medicamentos",
  ESTOQUE: "estoque",
  SOLICITACOES: "solicitacoes",
  ENTRADAS: "entradas",
  SAIDAS: "saidas",
};

export const localStorageService = {
  initialize() { 
    if (!localStorage.getItem(STORAGE_KEYS.MEDICAMENTOS)) {
      localStorage.setItem(
        STORAGE_KEYS.MEDICAMENTOS,
        JSON.stringify(medicamentosData)
      );
    }

    if (!localStorage.getItem(STORAGE_KEYS.ESTOQUE)) {
      localStorage.setItem(
        STORAGE_KEYS.ESTOQUE,
        JSON.stringify(estoqueData)
      );
    }

    if (!localStorage.getItem(STORAGE_KEYS.SOLICITACOES)) {
      localStorage.setItem(
        STORAGE_KEYS.SOLICITACOES,
        JSON.stringify(solicitacoesData)
      );
    }

    if (!localStorage.getItem(STORAGE_KEYS.ENTRADAS)) {
      localStorage.setItem(
        STORAGE_KEYS.ENTRADAS,
        JSON.stringify(entradasData)
      );
    }

    if (!localStorage.getItem(STORAGE_KEYS.SAIDAS)) {
      localStorage.setItem(
        STORAGE_KEYS.SAIDAS,
        JSON.stringify(saidasData)
      );
    }
  },

  get(key) {
    const data = localStorage.getItem(key);

    return data ? JSON.parse(data) : [];
  },

  set(key, value) {
    localStorage.setItem(
      key,
      JSON.stringify(value)
    );
  },

  remove(key) {
    localStorage.removeItem(key);
  },

  clearAll() {
    localStorage.clear();
  },
};

export { STORAGE_KEYS };