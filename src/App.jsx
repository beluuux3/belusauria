import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Landing from "./pages/Landing";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Configuracion from "./pages/Configuracion";
import Pedidos from "./components/mispedidos/Pedidos";
import ProtectedRoute from "./components/ProtectedRouter";

export default function App() {
  return (
    <>
      <Header></Header>

      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registrar" element={<Register />} />

        {/* Ruta protegida solo para admin */}
        <Route element={<ProtectedRoute RolUser={["admin"]} />}>
          <Route path="/configuracion/*" element={<Configuracion />} />
        </Route>

        {/* Ruta protegida para cliente y admin */}
        <Route element={<ProtectedRoute RolUser={["cliente", "admin"]} />}>
          <Route path="/mis-pedidos" element={<Pedidos />} />
        </Route>

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>

      <Footer></Footer>
    </>
  );
}
