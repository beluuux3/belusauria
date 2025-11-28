import axios from "axios";
//instancia creada
export const api = axios.create({
  baseURL: "https://api-funval-g6.onrender.com/",
  headers: { "Content-Type": `application/json` },
});
//intereceptor de request (LA SALIDA)
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});
//INTERCEPTOR DE RESPUESTA (LA LLEGADA)

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      console.log("sesion expirada, redirigi Login");
    }
    return Promise.reject(error);
  }
);
