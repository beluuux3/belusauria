import React from "react";

export default function SideNav({ categoriaSeleccionada, onCategoriaChange }) {
  const categorias = ["Todo", "Accesorios", "Vestir", "Papeleria", "Regalos"];

  const handleCategoriaClick = (categoria) => {
    if (categoria === "Todo") {
      onCategoriaChange("");
    } else {
      onCategoriaChange(categoria);
    }
  };

  return (
    <>
      <aside className="p-6 bg-white rounded-lg shadow-md ">
        <div className="mb-6">
          <h3 className="uppercase text-sm font-bold text-gray-700 mb-3 border-b pb-2">
            Categorias
          </h3>
          <ul className="space-y-2 text-sm">
            {categorias.map((category) => (
              <li key={category}>
                <button
                  onClick={() => handleCategoriaClick(category)}
                  className={`w-full text-left px-2 py-1 rounded transition ${
                    (category === "Todo" && categoriaSeleccionada === "") ||
                    categoriaSeleccionada === category
                      ? "bg-pink-100 text-pink-600 font-semibold"
                      : "text-gray-600 hover:text-pink-500 hover:bg-pink-50"
                  }`}
                >
                  {category}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Separador */}
        <hr className="my-6 border-gray-200" />
      </aside>
    </>
  );
}
