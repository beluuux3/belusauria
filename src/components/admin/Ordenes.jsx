import React, { useState, useEffect, useCallback } from "react";
import { orderService } from "../../services/userService";
import DetalleOrden from "../modals/DetalleOrden";
import PageHeader from "../common/PageHeader";
import Table from "../common/Table";
import StatusBadge from "../common/StatusBadge";

export default function Ordenes() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [userRole] = useState("admin");

  const fetchOrders = useCallback(async () => {
    try {
      const data = await orderService.getBelusauriaOrders();
      setOrders(data);
    } catch (err) {
      setError(err.message || "Failed to fetch orders");
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

  if (loading) return <p className="p-5">Cargando órdenes...</p>;
  if (error) return <p className="p-5 text-red-600">Error: {error}</p>;
  if (orders.length === 0)
    return (
      <p className="p-5">
        No se encontraron órdenes de usuarios @belusauria.com
      </p>
    );

  const tableHeaders = [
    "ID Orden",
    "Cliente",
    "Total",
    "Estado",
    "Fecha",
    "Acciones",
  ];

  return (
    <>
      <PageHeader title="ÓRDENES (@belusauria.com)" />

      <Table headers={tableHeaders}>
        {orders.map((order) => (
          <tr
            key={order.id}
            className="bg-neutral-primary border-b border-default"
          >
            <td className="px-6 py-4">{order.id}</td>
            <td className="px-6 py-4">{order.user_name || "N/A"}</td>
            <td className="px-6 py-4">Bs. {order.total}</td>
            <td className="px-6 py-4">
              <StatusBadge status={order.status} />
            </td>
            <td className="px-6 py-4">
              {new Date(order.created_at).toLocaleDateString()}
            </td>
            <td className="px-6 py-4">
              <button
                onClick={() => handleViewDetails(order.id)}
                className="text-indigo-600 hover:text-indigo-800 font-semibold"
              >
                Ver / Actualizar
              </button>
            </td>
          </tr>
        ))}
      </Table>

      {isModalOpen && selectedOrderId && (
        <DetalleOrden
          orderId={selectedOrderId}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedOrderId(null);
          }}
          onOrderUpdated={handleOrderUpdated}
          userRole={userRole}
        />
      )}
    </>
  );
}
