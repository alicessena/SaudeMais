import styles from "./MedicamentoModal.module.css";
function MedicamentoModal({
  isOpen,
  onClose,
  onSubmit,
  form,
  setForm,
  editando,
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
          <h2>
            {editando
              ? "Editar Medicamento"
              : "Novo Medicamento"}
          </h2>
          <button
            className={styles.closeButton}
            onClick={onClose}
          >
            ×
          </button>
        </div>
        <form
          onSubmit={handleSubmit}
          className={styles.form}
        >
          <div className={styles.field}>
            <label>Nome</label>
            <input
              name="nome"
              value={form.nome}
              onChange={handleChange}
              required
            />
          </div>
          <div className={styles.field}>
            <label>Princípio Ativo</label>
            <input
              name="principioAtivo"
              value={form.principioAtivo}
              onChange={handleChange}
              required
            />
          </div>
          <div className={styles.field}>
            <label>Fabricante</label>
            <select
              name="fabricante"
              value={form.fabricante}
              onChange={handleChange}
              required
            >
              <option value="">
                Selecione
              </option>
              <option value="FNT">
                FNT
              </option>
              <option value="LATAMFarma">
                LATAMFarma
              </option>
              <option value="Cristálius">
                Cristálius
              </option>
              <option value="Ifonas">
                Ifonas
              </option>
              <option value="Arephy">
                Arephy
              </option>
            </select>
          </div>
          <div className={styles.field}>
            <label>Preço Unitário</label>
            <input
              type="number"
              step="0.01"
              name="precoUnitario"
              value={form.precoUnitario}
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
              Salvar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
export default MedicamentoModal;
