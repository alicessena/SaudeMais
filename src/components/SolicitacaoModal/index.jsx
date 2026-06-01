import styles from "./SolicitacaoModal.module.css";

function SolicitacaoModal({
  isOpen,
  onClose,
  onSubmit,
  form,
  setForm,
  medicamentos,
}) {
  if (!isOpen) return null;

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <h2>Nova Solicitação</h2>

          <button
            className={styles.closeButton}
            onClick={onClose}
          >
            ×
          </button>
        </div>

        <form
          className={styles.form}
          onSubmit={handleSubmit}
        >
          <div className={styles.field}>
            <label>Medicamento</label>

            <select
              name="medicamentoId"
              value={form.medicamentoId}
              onChange={handleChange}
              required
            >
              <option value="">
                Selecione
              </option>

              {medicamentos.map(
                (medicamento) => (
                  <option
                    key={medicamento.id}
                    value={medicamento.id}
                  >
                    {medicamento.nome}
                  </option>
                )
              )}
            </select>
          </div>

          <div className={styles.field}>
            <label>Tipo</label>

            <select
              name="tipoMovimento"
              value={form.tipoMovimento}
              onChange={handleChange}
              required
            >
              <option value="">
                Selecione
              </option>

              <option value="entrada">
                Entrada
              </option>

              <option value="saida">
                Saída
              </option>
            </select>
          </div>

          <div className={styles.field}>
            <label>Quantidade</label>

            <input
              type="number"
              min="1"
              name="quantidade"
              value={form.quantidade}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.field}>
            <label>Motivo</label>

            <textarea
              rows="4"
              name="motivo"
              value={form.motivo}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.field}>
            <label>Solicitante</label>

            <input
              type="text"
              name="solicitante"
              value={form.solicitante}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.actions}>
            <button
              type="button"
              className={styles.cancel}
              onClick={onClose}
            >
              Cancelar
            </button>

            <button
              type="submit"
              className={styles.save}
            >
              Criar Solicitação
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SolicitacaoModal;