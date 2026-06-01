import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "../components/Layout";

import Dashboard from "../pages/Dashboard";
import Medicamentos from "../pages/Medicamentos";
import Estoque from "../pages/Estoque";
import Solicitacoes from "../pages/Solicitacoes";
import Entradas from "../pages/Entradas";
import Saidas from "../pages/Saidas";
import Aprovacoes from "../pages/Aprovacoes";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/medicamentos" element={<Medicamentos />} />
          <Route path="/estoque" element={<Estoque />} />
          <Route path="/solicitacoes" element={<Solicitacoes />} />
          <Route path="/entradas" element={<Entradas />} />
          <Route path="/saidas" element={<Saidas />} />
          <Route path="/aprovacoes" element={<Aprovacoes />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;