import React from "react";

export default function StatusBadge({ status }) {
  const statusStyles = {
    pendiente: "bg-yellow-100 text-yellow-800",
    pagado: "bg-blue-100 text-blue-800",
    entregado: "bg-green-100 text-green-800",
  };

  return (
    <span
      className={`px-2 py-1 rounded text-xs font-semibold ${
        statusStyles[status] || "bg-gray-100 text-gray-800"
      }`}
    >
      {status}
    </span>
  );
}
