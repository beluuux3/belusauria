import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { productService } from "../services/productService";

export default function Products({ categoriaFiltro }) {
  const [producto, setProducto] = useState([]);
  const [loading, setLoading] = useState(false);

  async function traerDatos() {
    setLoading(true);
    try {
      const data = await productService().getAll();
      setProducto(data);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    traerDatos();
  }, []);

  if (loading) {
    return (
      <section className="py-20 text-center text-2xl font-semibold text-gray-500">
        Cargando productos...
      </section>
    );
  }

  let productosFiltrados = producto.filter(
    (p) => p.category && p.category.startsWith("Belu")
  );

  if (categoriaFiltro) {
    const categoriaCompleta = `Belu${categoriaFiltro}`;
    productosFiltrados = productosFiltrados.filter(
      (p) => p.category === categoriaCompleta
    );
  }

  return (
    <>
      <section className="py-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-gray-800 border-l-4 border-pink-500 pl-3">
            Products
          </h2>
        </div>

        {productosFiltrados.length === 0 ? (
          <p className="text-center text-xl text-gray-600">
            No se encontraron productos disponibles.
          </p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {productosFiltrados.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onProductUpdate={traerDatos}
              />
            ))}
          </div>
        )}
      </section>
    </>
  );
}
