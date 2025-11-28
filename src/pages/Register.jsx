import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import imageRegister from "../images/imag2.jpg";

export default function Register() {
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const [nombre, setNombre] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  async function enviarFormulario(e) {
    e.preventDefault();
    console.log(correo);
    console.log(password);
    console.log(nombre);

    try {
      const respuesta = await fetch(
        "https://api-funval-g6.onrender.com/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: correo,
            password: password,
            name: nombre,
          }),
        }
      );
      const data = await respuesta.json();
      console.log(data);
      if (!respuesta.ok) {
        throw new Error(data.message || "credenciales incorrectas");
      }
      alert("usuario registrado con exito");
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  }
  return (
    <>
      <div className="h-screen flex items-center justify-center">
        <div className="h-screen flex items-center">
          <form
            onSubmit={enviarFormulario}
            className="w-[400px] bg-[#921f3c] p-8 rounded-2xl"
          >
            <div className="relative z-0 w-full mb-5 group">
              <input
                onChange={(e) => {
                  setCorreo(e.target.value);
                }}
                type="email"
                name="floating_email"
                id="floating_email"
                className="block py-2.5 px-0 w-full text-sm  text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-pink-600 peer"
                placeholder=" "
                required=""
              />
              <label
                htmlFor="floating_email"
                className=" peer-focus:font-medium absolute text-sm text-white  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-pink-200  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Email address
              </label>
            </div>
            <div className="relative z-0 w-full mb-5 group">
              <input
                type="text"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                name="floating_password"
                id="floating_password"
                className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-pink-600 peer"
                placeholder=" "
                required=""
              />
              <label
                htmlFor="floating_password"
                className="peer-focus:font-medium absolute text-sm text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-pink-200 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Password
              </label>
            </div>
            <div className="relative z-0 w-full mb-5 group">
              <input
                onChange={(e) => {
                  setNombre(e.target.value);
                }}
                type="text"
                className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-pink-600 peer"
                placeholder=" "
                required=""
              />
              <label
                required=""
                className="peer-focus:font-medium absolute text-sm text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-pink-200 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Full Name
              </label>
            </div>

            <div className="flex items-center justify-center">
              <button
                type="submit"
                className="text-white bg-[#dd2947] hover:bg-[#3d0a13] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center "
              >
                Registrarme
              </button>
            </div>

            <div className="flex items-center justify-center p-4">
              <p className="text-white">
                Ya tienes una cuenta?{" "}
                <span className="font-bold">
                  <Link to="/login">Inicia Sesión</Link>
                </span>
              </p>
            </div>
          </form>
        </div>
        <div>
          <img src={imageRegister} alt="" />
        </div>
      </div>
    </>
  );
}
