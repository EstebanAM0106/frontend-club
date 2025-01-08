"use client";

import React, { createContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      // Aquí puedes agregar lógica para verificar el token y obtener el usuario
      const userData = JSON.parse(localStorage.getItem("userData"));
      setUser(userData); // Establecer los datos del usuario, incluyendo el rol
    } else {
      router.push("/login");
    }
  }, [router]);

  const login = (userData) => {
    localStorage.setItem("userData", JSON.stringify(userData)); // Guardar los datos del usuario en localStorage
    setUser(userData);
    router.push("/"); // Redirigir a la lista de actividades después del inicio de sesión
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userData");
    setUser(null);
    router.push("/login");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
