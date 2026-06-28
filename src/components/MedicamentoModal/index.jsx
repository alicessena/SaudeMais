import { Button, Field, Form, FormActions, ModalShell } from "../UI";

function MedicamentoModal({ isOpen, onClose, onSubmit, form, setForm, editando }) {
  if (!isOpen) return null;

  const handleChange = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit();
  };

  return (
    <ModalShell title={editando ? "Editar medicamento" : "Novo medicamento"} onClose={onClose}>
      <Form onSubmit={handleSubmit}>
        <Field label="Nome">
          <input name="nome" value={form.nome} onChange={handleChange} required />
        </Field>

        <Field label="Princípio ativo">
          <input name="principioAtivo" value={form.principioAtivo} onChange={handleChange} required />
        </Field>

        <Field label="Fabricante">
          <select name="fabricante" value={form.fabricante} onChange={handleChange} required>
            <option value="">Selecione</option>
            <option value="FNT">FNT</option>
            <option value="LATAMFarma">LATAMFarma</option>
            <option value="Cristálius">Cristálius</option>
            <option value="Ifonas">Ifonas</option>
            <option value="Arephy">Arephy</option>
          </select>
        </Field>

        <Field label="Preço unitário">
          <input
            type="number"
            step="0.01"
            min="0"
            name="precoUnitario"
            value={form.precoUnitario}
            onChange={handleChange}
            required
          />
        </Field>

        <FormActions>
          <Button variant="secondary" onClick={onClose}>
            Cancelar
          </Button>
          <Button type="submit">Salvar</Button>
        </FormActions>
      </Form>
    </ModalShell>
  );
}

export default MedicamentoModal;
