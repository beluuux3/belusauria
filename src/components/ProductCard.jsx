import React, { useState } from "react";
import CrearOrden from "./modals/CrearOrden";

export default function ProductCard({ product, onProductUpdate }) {
  const { name, price, image_url, description } = product;
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddToCart = () => {
    setIsModalOpen(true);
  };

  const handleOrderCreated = () => {
    setIsModalOpen(false);
    alert("Orden creada exitosamente!");
    if (onProductUpdate) {
      onProductUpdate();
    }
  };

  return (
    <>
      <div className="bg-white rounded-lg shadow hover:shadow-lg transition duration-300">
        <img
          src={image_url}
          alt={name}
          className="w-full h-40 object-contain mb-4"
        />
        <h3 className="text-lg px-4 font-semibold text-gray-800">{name}</h3>
        <h4 className="px-4 text-sm">{description}</h4>

        <div className="flex px-4 pb-4 justify-between items-center mt-2">
          <span className="text-lg font-bold text-pink-600">Bs. {price}</span>
          <button
            onClick={handleAddToCart}
            className="bg-pink-500 hover:bg-pink-600 text-white p-2 rounded-full transition"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
          </button>
        </div>
      </div>

      {isModalOpen && (
        <CrearOrden
          product={product}
          onClose={() => setIsModalOpen(false)}
          onOrderCreated={handleOrderCreated}
        />
      )}
    </>
  );
}
