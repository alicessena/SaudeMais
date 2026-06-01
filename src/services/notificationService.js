import { toast } from "react-toastify";

export const notificationService = {
  success(message) {
    toast.success(message);
  },

  error(message) {
    toast.error(message);
  },

  warning(message) {
    toast.warning(message);
  },

  info(message) {
    toast.info(message);
  },

  medicamentoCriado() {
    toast.success(
      "Medicamento cadastrado com sucesso!"
    );
  },

  medicamentoAtualizado() {
    toast.success(
      "Medicamento atualizado com sucesso!"
    );
  },

  medicamentoRemovido() {
    toast.success(
      "Medicamento removido com sucesso!"
    );
  },

  estoqueAtualizado() {
    toast.success(
      "Estoque atualizado com sucesso!"
    );
  },

  solicitacaoCriada() {
    toast.success(
      "Solicitação criada com sucesso!"
    );
  },

  solicitacaoAprovada() {
    toast.success(
      "Solicitação aprovada!"
    );
  },

  solicitacaoReprovada() {
    toast.warning(
      "Solicitação reprovada."
    );
  },

  entradaRegistrada() {
    toast.success(
      "Entrada registrada no estoque."
    );
  },

  saidaRegistrada() {
    toast.success(
      "Saída registrada no estoque."
    );
  },

  estoqueInsuficiente() {
    toast.error(
      "Estoque insuficiente para esta operação."
    );
  },

  dadosSalvos() {
    toast.success(
      "Dados salvos com sucesso!"
    );
  },

  erroSistema() {
    toast.error(
      "Ocorreu um erro inesperado."
    );
  },
};