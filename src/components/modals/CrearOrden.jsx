import React, { useState } from "react";
import { orderService } from "../../services/userService";

export default function CrearOrden({ product, onClose, onOrderCreated }) {
  const [quantity, setQuantity] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value);
    if (value > 0 && value <= product.stock) {
      setQuantity(value);
    }
  };

  const handleIncrement = () => {
    if (quantity < product.stock) {
      setQuantity(quantity + 1);
    }
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      const orderData = {
        items: [
          {
            product_id: product.id,
            quantity: quantity,
          },
        ],
      };

      await orderService.createOrder(orderData);
      onOrderCreated();
    } catch (err) {
      console.error("Error al crear orden:", err.response?.data || err.message);
      setError(
        err.response?.data?.detail ||
          "Error al crear la orden. Verifica el stock disponible."
      );
      setIsSubmitting(false);
    }
  };

  const total = (parseFloat(product.price) * quantity).toFixed(2);

  return (
    <div className="fixed inset-0 bg-pink-950/45 overflow-y-auto h-full w-full flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full">
        <h3 className="text-xl font-bold mb-4 text-gray-800">
          Confirmar Orden
        </h3>

        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}

        <div className="mb-4">
          <div className="flex gap-4">
            {product.image_url && (
              <img
                src={product.image_url}
                alt={product.name}
                className="w-20 h-20 object-cover rounded"
              />
            )}
            <div className="flex-1">
              <h4 className="font-semibold text-gray-800">{product.name}</h4>
              <p className="text-sm text-gray-600">{product.description}</p>
              <p className="text-pink-600 font-bold mt-1">
                Bs. {product.price}
              </p>
              <p className="text-sm text-gray-500">
                Stock disponible: {product.stock}
              </p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Cantidad
            </label>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={handleDecrement}
                disabled={quantity <= 1}
                className="bg-gray-200 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed text-gray-800 font-bold w-10 h-10 rounded"
              >
                -
              </button>
              <input
                type="number"
                value={quantity}
                onChange={handleQuantityChange}
                min="1"
                max={product.stock}
                className="shadow appearance-none border rounded w-20 py-2 px-3 text-gray-700 text-center leading-tight focus:outline-none focus:shadow-outline"
              />
              <button
                type="button"
                onClick={handleIncrement}
                disabled={quantity >= product.stock}
                className="bg-gray-200 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed text-gray-800 font-bold w-10 h-10 rounded"
              >
                +
              </button>
            </div>
          </div>

          <div className="mb-6 p-4 bg-gray-50 rounded">
            <div className="flex justify-between items-center">
              <span className="text-gray-700 font-semibold">Total:</span>
              <span className="text-2xl font-bold text-pink-600">
                Bs. {total}
              </span>
            </div>
          </div>

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="bg-gray-300 hover:bg-gray-400 disabled:opacity-50 text-gray-800 font-bold py-2 px-4 rounded"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`bg-pink-500 text-white font-bold py-2 px-4 rounded ${
                isSubmitting
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-pink-600"
              }`}
            >
              {isSubmitting ? "Procesando..." : "Confirmar Orden"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
