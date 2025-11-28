import React, { useState } from "react";
import SideNav from "./SideNav";

import Products from "./Products";

export default function ContainerHome() {
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("");

  return (
    <>
      <div className="mt-25">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:flex">
          <div className="md:w-1/4 pr-8">
            <SideNav
              categoriaSeleccionada={categoriaSeleccionada}
              onCategoriaChange={setCategoriaSeleccionada}
            />
          </div>

          <div className="md:w-3/4">
            <Products categoriaFiltro={categoriaSeleccionada} />
          </div>
        </div>
      </div>
    </>
  );
}
