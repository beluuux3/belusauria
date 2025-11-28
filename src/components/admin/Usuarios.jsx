import React, { useState, useEffect, useCallback } from "react";
import { userService } from "../../services/userService";
import CrearUsuario from "../modals/CrearUsuario";
import EditarUsuario from "../modals/EditarUsuario";
import PageHeader from "../common/PageHeader";
import Table from "../common/Table";

export default function Usuarios() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);

  const fetchUsers = useCallback(async () => {
    try {
      const data = await userService.getBelusauriaUsers();
      setUsers(data);
    } catch (err) {
      setError(err.message || "Failed to fetch users");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleCreateClick = () => setIsModalOpen(true);
  const handleUserCreated = () => {
    setIsModalOpen(false);
    fetchUsers();
  };

  const handleEditClick = (userId) => {
    setSelectedUserId(userId);
    setIsEditModalOpen(true);
  };

  const handleUserUpdated = () => {
    setIsEditModalOpen(false);
    setSelectedUserId(null);
    fetchUsers();
  };

  if (loading) return <p className="p-5">Cargando usuarios...</p>;
  if (error) return <p className="p-5 text-red-600">Error: {error}</p>;
  if (users.length === 0)
    return <p className="p-5">No se encontraron usuarios de @belusauria.com</p>;

  const tableHeaders = ["ID", "Nombre", "Email", "Rol", "Acciones"];

  return (
    <>
      <PageHeader
        title="USUARIOS"
        buttonText="+ Crear Usuario"
        onButtonClick={handleCreateClick}
      />

      <Table headers={tableHeaders}>
        {users.map((user) => (
          <tr
            key={user.id}
            className="bg-neutral-primary border-b border-default"
          >
            <td className="px-6 py-4">{user.id}</td>
            <th
              scope="row"
              className="px-6 py-4 font-medium text-heading whitespace-nowrap"
            >
              {user.name}
            </th>
            <td className="px-6 py-4">{user.email}</td>
            <td className="px-6 py-4">{user.role}</td>
            <td className="px-6 py-4">
              <button
                onClick={() => handleEditClick(user.id)}
                className="text-pink-500 hover:text-pink-800 font-semibold"
              >
                Editar
              </button>
            </td>
          </tr>
        ))}
      </Table>

      {isModalOpen && (
        <CrearUsuario
          onClose={() => setIsModalOpen(false)}
          onUserCreated={handleUserCreated}
        />
      )}

      {isEditModalOpen && selectedUserId && (
        <EditarUsuario
          userId={selectedUserId}
          onClose={() => {
            setIsEditModalOpen(false);
            setSelectedUserId(null);
          }}
          onUserUpdated={handleUserUpdated}
        />
      )}
    </>
  );
}
