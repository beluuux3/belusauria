import React, { useState, useEffect } from "react";
import { userService } from "../../services/userService";

export default function EditarUsuario({ userId, onClose, onUserUpdated }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "cliente",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  // Cargar datos del usuario al montar el componente
  useEffect(() => {
    const loadUser = async () => {
      try {
        const user = await userService.getUserById(userId);
        setFormData({
          name: user.name || "",
          email: user.email || "",
          password: "", // No mostrar contraseña por seguridad
          role: user.role || "cliente",
        });
        setLoading(false);
      } catch (err) {
        console.error("Error al cargar usuario:", err);
        setError("Error al cargar los datos del usuario.");
        setLoading(false);
      }
    };

    loadUser();
  }, [userId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      // Construir el objeto con solo los campos que se van a actualizar
      const dataToSend = {
        name: formData.name,
        email: formData.email,
        role: formData.role,
      };

      // Solo agregar password si el usuario ingresó uno nuevo
      if (formData.password.trim() !== "") {
        dataToSend.password = formData.password;
      }

      await userService.updateUser(userId, dataToSend);
      onUserUpdated();
    } catch (err) {
      console.error(
        "Error al actualizar usuario:",
        err.response?.data || err.message
      );
      setError(
        "Error al actualizar el usuario. Revisa los datos o la conexión."
      );
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="fixed inset-0 bg-pink-950/45 overflow-y-auto h-full w-full flex justify-center items-center z-50">
        <div className="bg-white p-6 rounded-lg shadow-xl max-w-lg w-full">
          <p className="text-center">Cargando usuario...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-pink-950/45 overflow-y-auto h-full w-full flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-xl max-w-lg w-full">
        <h3 className="text-xl font-bold mb-4">Editar Usuario</h3>

        <form onSubmit={handleSubmit}>
          {error && <p className="text-red-500 mb-3">{error}</p>}

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Nombre
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Contraseña (dejar en blanco para no cambiar)
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Nueva contraseña (opcional)"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Rol
            </label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value="cliente">Cliente</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded mr-2"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`bg-[#3b82f6] text-white font-bold py-2 px-4 rounded ${
                isSubmitting
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-[#1d4ed8]"
              }`}
            >
              {isSubmitting ? "Actualizando..." : "Actualizar Usuario"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
