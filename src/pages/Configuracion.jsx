import React from "react";
import NavConfig from "../components/NavConfig";
import Usuarios from "../components/admin/Usuarios";
import Productos from "../components/admin/Productos";
import Ordenes from "../components/admin/Ordenes";
import { Routes, Route, Navigate } from "react-router-dom";

export default function Configuracion() {
  return (
    <>
      <div className="py-8 md:flex h-screen">
        <div className="mt-30 md:w-1/4">
          <NavConfig />
        </div>
        <div className="md:w-3/4 mt-30">
          <Routes>
            <Route path="/" element={<Usuarios />} />
            <Route path="usuarios" element={<Usuarios />} />
            <Route path="productos" element={<Productos />} />
            <Route path="ordenes" element={<Ordenes />} />
            <Route path="*" element={<Navigate to="" replace />} />
          </Routes>
        </div>
      </div>
    </>
  );
}
