import React, { useState } from "react"; // <-- Importa useState
import { Link, useNavigate } from "react-router-dom"; // <-- Importa useNavigate si quieres redireccionar
import { useAuth } from "../context/AuthContext"; // <-- IMPORTA TU HOOK DE AUTENTICACIÓN
import Logo from "../images/LogoBelu.png";

export default function Header() {
  const { user, logout } = useAuth(); // <-- Obtenemos el usuario y la función logout
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // <-- Estado para el menú desplegable
  const navigate = useNavigate(); // Hook para redireccionar después de logout

  const handleLogout = () => {
    logout();
    setIsDropdownOpen(false); // Cierra el menú
    navigate("/"); // Redirige a la página principal o de login
  };

  const handleUserClick = () => {
    setIsDropdownOpen((prev) => !prev); // Alterna el estado del menú
  };

  // Estilo básico para el menú (puedes adaptarlo a Tailwind CSS)
  const dropdownStyle = {
    position: "absolute",
    right: 0,
    top: "100%",
    zIndex: 10,
    backgroundColor: "white",
    border: "1px solid #ccc",
    padding: "8px",
    borderRadius: "4px",
    minWidth: "150px",
    display: isDropdownOpen ? "block" : "none",
  };
  return (
    <>
      <header className="fixed w-full">
        <div className="">
          <nav className="bg-white border-b border-gray-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center py-4">
              <div className="">
                <img src={Logo} alt="LogoBelusita" className="h-[100px]" />
              </div>
              <div className="hidden md:flex space-x-8">
                <a
                  href="/"
                  className="text-[#b62a59] hover:text-[#660f2c] font-semibold text-xl"
                >
                  HOME
                </a>
              </div>

              {user ? (
                <div className="relative">
                  <button
                    onClick={handleUserClick}
                    className="bg-[#ff657f] text-white p-2 rounded-2xl font-bold hover:bg-[#da213f] flex items-center"
                  >
                    Hola, {user.name} ▼
                  </button>

                  <div style={dropdownStyle}>
                    {user.role === "admin" ? (
                      <Link
                        to="/configuracion"
                        onClick={() => setIsDropdownOpen(false)}
                        className="block p-2 hover:bg-gray-100"
                      >
                        Configuración
                      </Link>
                    ) : (
                      <Link
                        to="/mis-pedidos"
                        onClick={() => setIsDropdownOpen(false)}
                        className="block p-2 hover:bg-gray-100"
                      >
                        Mis Pedidos
                      </Link>
                    )}
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left p-2 hover:bg-gray-100"
                    >
                      Cerrar Sesión
                    </button>
                  </div>
                </div>
              ) : (
                <Link
                  to="/login"
                  className="bg-[#ff657f] text-white p-2 rounded-2xl font-bold hover:bg-amber-900"
                >
                  LOGIN/REGISTER
                </Link>
              )}
            </div>
          </nav>
        </div>
      </header>
    </>
  );
}
