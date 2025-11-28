import React from "react";
import { Link } from "react-router-dom";

export default function NavConfig() {
  const routes = [
    { name: "Usuarios", to: "/configuracion/usuarios" },
    { name: "Ordenes", to: "/configuracion/ordenes" },
    { name: "Productos", to: "/configuracion/productos" },
  ];
  return (
    <>
      <aside className="px-6 h-full rounded-lg shadow-md ">
        <div className="">
          <h3 className="uppercase text-sm font-bold text-gray-700 mb-3 border-b pb-2">
            ADMIN
          </h3>
          <ul className="space-y-2 text-sm">
            {routes.map((item) => (
              <li key={item.name}>
                <Link
                  to={item.to}
                  className="text-gray-600 hover:text-orange-500 transition block p-1"
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </aside>
    </>
  );
}
