import styles from "./EstoqueModal.module.css";

function EstoqueModal({
  isOpen,
  onClose,
  onSubmit,
  form,
  setForm,
}) {
  if (!isOpen) return null;

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: Number(
        e.target.value
      ),
    });
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <h2>Ajustar Estoque</h2>

          <button
            onClick={onClose}
            className={styles.close}
          >
            ×
          </button>
        </div>

        <div className={styles.form}>
          <div className={styles.field}>
            <label>
              Quantidade Atual
            </label>

            <input
              type="number"
              name="quantidadeTotal"
              value={
                form.quantidadeTotal
              }
              onChange={handleChange}
            />
          </div>

          <div className={styles.field}>
            <label>
              Estoque Mínimo
            </label>

            <input
              type="number"
              name="quantidadeMinima"
              value={
                form.quantidadeMinima
              }
              onChange={handleChange}
            />
          </div>

          <div className={styles.actions}>
            <button
              className={styles.cancel}
              onClick={onClose}
            >
              Cancelar
            </button>

            <button
              className={styles.save}
              onClick={onSubmit}
            >
              Salvar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EstoqueModal;