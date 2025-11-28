import React, { useState, useEffect, useCallback } from "react";
import { orderService } from "../../services/userService";
import DetalleOrden from "../ordenes/DetalleOrden";

export default function Pedidos() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState(null);

  const fetchOrders = useCallback(async () => {
    try {
      // Este endpoint ya filtra las órdenes del cliente autenticado
      const response = await orderService.getBelusauriaOrders();
      setOrders(response);
    } catch (err) {
      setError(err.message || "Error al cargar pedidos");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  const handleViewDetails = (orderId) => {
    setSelectedOrderId(orderId);
    setIsModalOpen(true);
  };

  const handleOrderUpdated = () => {
    setIsModalOpen(false);
    setSelectedOrderId(null);
    fetchOrders();
  };

  if (loading) return <p className="p-5">Cargando tus pedidos...</p>;
  if (error) return <p className="p-5 text-red-600">Error: {error}</p>;
  if (orders.length === 0)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600 text-lg">
          No tienes pedidos realizados aún
        </p>
      </div>
    );

  const tableHeaders = ["ID Pedido", "Total", "Estado", "Fecha", "Acciones"];

  return (
    <>
      <div className="min-h-screen py-8">
        <div className="flex justify-between items-center p-5 mx-10">
          <h2 className="font-bold text-2xl">MIS PEDIDOS</h2>
        </div>

        <div className="mx-10 overflow-x-auto bg-neutral-primary-soft shadow-xs rounded-base border border-default">
          <table className="w-full text-sm text-left rtl:text-right text-body">
            <thead className="text-sm bg-[#ffa2c6] text-body bg-neutral-secondary-soft border-b rounded-base border-default">
              <tr>
                {tableHeaders.map((header) => (
                  <th
                    key={header}
                    scope="col"
                    className="px-6 py-3 font-medium"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr
                  key={order.id}
                  className="bg-neutral-primary border-b border-default"
                >
                  <td className="px-6 py-4">{order.id}</td>
                  <td className="px-6 py-4">Bs. {order.total}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-2 py-1 rounded text-xs font-semibold ${
                        order.status === "pendiente"
                          ? "bg-yellow-100 text-yellow-800"
                          : order.status === "pagado"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-green-100 text-green-800"
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    {new Date(order.created_at).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => handleViewDetails(order.id)}
                      className="text-pink-600 hover:text-pink-800 font-semibold"
                    >
                      Ver Detalles
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Modal de Detalles */}
        {isModalOpen && selectedOrderId && (
          <DetalleOrden
            orderId={selectedOrderId}
            onClose={() => {
              setIsModalOpen(false);
              setSelectedOrderId(null);
            }}
            onOrderUpdated={handleOrderUpdated}
            userRole="cliente"
          />
        )}
      </div>
    </>
  );
}
