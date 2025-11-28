import React, { useState, useEffect } from "react";
import { orderService } from "../../services/userService";

export default function DetalleOrden({
  orderId,
  onClose,
  onOrderUpdated,
  userRole,
}) {
  const [orderDetails, setOrderDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const data = await orderService.getOrderById(orderId);
        setOrderDetails(data);
        setSelectedStatus(data.status);
        setLoading(false);
      } catch (err) {
        console.error("Error al cargar detalles:", err);
        setError("Error al cargar los detalles de la orden.");
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, [orderId]);

  const handleUpdateStatus = async () => {
    setIsUpdating(true);
    setError(null);

    try {
      await orderService.updateOrderStatus(orderId, selectedStatus);
      onOrderUpdated();
    } catch (err) {
      console.error("Error al actualizar estado:", err);
      setError("Error al actualizar el estado de la orden.");
      setIsUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="fixed inset-0 bg-pink-950/45 overflow-y-auto h-full w-full flex justify-center items-center z-50">
        <div className="bg-white p-6 rounded-lg shadow-xl max-w-2xl w-full">
          <p className="text-center">Cargando detalles...</p>
        </div>
      </div>
    );
  }

  if (error && !orderDetails) {
    return (
      <div className="fixed inset-0 bg-pink-950/45 overflow-y-auto h-full w-full flex justify-center items-center z-50">
        <div className="bg-white p-6 rounded-lg shadow-xl max-w-2xl w-full">
          <p className="text-center text-red-600">{error}</p>
          <button
            onClick={onClose}
            className="mt-4 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded mx-auto block"
          >
            Cerrar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-pink-950/45 overflow-y-auto h-full w-full flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-xl max-w-2xl w-full">
        <h3 className="text-xl font-bold mb-4">
          Detalles de la Orden #{orderDetails.id}
        </h3>

        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}

        {/* Información General */}
        <div className="mb-6 p-4 bg-gray-50 rounded">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-600">Cliente:</p>
              <p className="font-semibold">{orderDetails.user_name || "N/A"}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Fecha:</p>
              <p className="font-semibold">
                {new Date(orderDetails.created_at).toLocaleString()}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Total:</p>
              <p className="font-semibold text-pink-600 text-lg">
                Bs. {orderDetails.total}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Estado Actual:</p>
              <p className="font-semibold">
                <span
                  className={`px-2 py-1 rounded text-sm ${
                    orderDetails.status === "pendiente"
                      ? "bg-yellow-100 text-yellow-800"
                      : orderDetails.status === "pagado"
                      ? "bg-blue-100 text-blue-800"
                      : "bg-green-100 text-green-800"
                  }`}
                >
                  {orderDetails.status}
                </span>
              </p>
            </div>
          </div>
        </div>

        {/* Productos */}
        <div className="mb-6">
          <h4 className="font-semibold mb-3">Productos:</h4>
          <div className="border rounded overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-2 text-left">Producto</th>
                  <th className="px-4 py-2 text-center">Cantidad</th>
                  <th className="px-4 py-2 text-right">Precio</th>
                  <th className="px-4 py-2 text-right">Subtotal</th>
                </tr>
              </thead>
              <tbody>
                {orderDetails.items.map((item, index) => (
                  <tr key={index} className="border-t">
                    <td className="px-4 py-2">{item.product_name}</td>
                    <td className="px-4 py-2 text-center">{item.quantity}</td>
                    <td className="px-4 py-2 text-right">Bs. {item.price}</td>
                    <td className="px-4 py-2 text-right">
                      Bs. {item.subtotal}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Actualizar Estado (Solo Admin) */}
        {userRole === "admin" && (
          <div className="mb-6 p-4 bg-blue-50 rounded">
            <h4 className="font-semibold mb-3">
              Actualizar Estado de la Orden:
            </h4>
            <div className="flex gap-3 items-center">
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="flex-1 shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              >
                <option value="pendiente">Pendiente</option>
                <option value="pagado">Pagado</option>
                <option value="entregado">Entregado</option>
              </select>
              <button
                onClick={handleUpdateStatus}
                disabled={isUpdating || selectedStatus === orderDetails.status}
                className={`bg-blue-500 text-white font-bold py-2 px-4 rounded ${
                  isUpdating || selectedStatus === orderDetails.status
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:bg-blue-600"
                }`}
              >
                {isUpdating ? "Actualizando..." : "Actualizar"}
              </button>
            </div>
          </div>
        )}

        {/* Botones */}
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
}
