import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import imageLogin from "../images/imag1.jpg";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function enviarFormulario(e) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const respuesta = await fetch(
        "https://api-funval-g6.onrender.com/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        }
      );

      const data = await respuesta.json();
      if (!respuesta.ok) {
        throw new Error(data.message || "credenciales incorrectas");
      }
      localStorage.setItem("token", data.access_token);
      localStorage.setItem("role", data.user_role);
      login(data.access_token);
      if (data.user_role === "admin") {
        navigate("/Home");
      } else {
        navigate("/Cliente");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }
  function crearCuenta() {
    navigate("/registrar");
  }
  return (
    <>
      <div className="h-screen flex items-center justify-center">
        <div>
          <img src={imageLogin} alt="" className="h-[500px]" />
        </div>
        <div className="h-screen  flex items-center justify-center">
          <form
            onSubmit={enviarFormulario}
            className="w-[400px] bg-[#921f3c] p-8 rounded-2xl"
          >
            <div className="mb-5">
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Tu Correo
              </label>
              <input
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                type="email"
                id="email"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="name@belusauria.com"
                required=""
              />
            </div>
            <div className="mb-5">
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Tu Contraseña
              </label>
              <input
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                type="password"
                placeholder="********"
                id="password"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required=""
              />
            </div>
            <div className="flex items-start mb-5">
              <div className="flex items-center h-5">
                <input
                  id="remember"
                  type="checkbox"
                  defaultValue=""
                  className="w-4 h-4 border border-gray-300 rounded-sm bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
                  required=""
                />
              </div>
              <label
                htmlFor="remember"
                className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Recuerda mi cuenta
              </label>
            </div>
            <div className="flex gap-4 items-center justify-center">
              <button
                type="submit"
                className="text-white bg-[#ff397b] hover:bg-[#da205e] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center "
              >
                Ingresar
              </button>
              <button
                onClick={crearCuenta}
                className="text-white bg-[#f775a0] hover:bg-[#801236] focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
              >
                crear cuenta
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
