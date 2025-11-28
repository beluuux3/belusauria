import React, { createContext, useState, useEffect, useContext } from "react";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function traerPerfil() {
      const currentToken = localStorage.getItem("token");
      if (!currentToken) {
        setToken(null);
        setIsLoading(false);
        return;
      }

      try {
        const respuesta = await fetch(
          "https://api-funval-g6.onrender.com/auth/me",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${currentToken}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (!respuesta.ok) {
          throw new Error("Token inválido o expirado");
        }

        const data = await respuesta.json();
        setToken(currentToken);
        setUser({
          name: data.name,
          email: data.email,
          role: data.role,
        });
      } catch (error) {
        console.error("Error al obtener el perfil:", error);
        localStorage.removeItem("token");
        setToken(null);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    }

    traerPerfil();
  }, [token]);

  const login = (authToken) => {
    localStorage.setItem("token", authToken);
    setToken(authToken);
  };

  const logout = () => {
    localStorage.clear();
    setToken(null);
    setUser(null);
    setIsLoading(false);
  };

  const value = {
    user,
    isLoggedIn: !!user,
    isLoading,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
