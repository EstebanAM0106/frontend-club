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
      const userData = JSON.parse(localStorage.getItem("userData"));
      setUser(userData);

      // Configurar el logout automático
      const timeout = setTimeout(() => {
        logout();
      }, 360000); // 1 hora en milisegundos

      return () => clearTimeout(timeout);
    } else {
      router.push("/login");
    }
  }, [router]);

  const login = (userData) => {
    localStorage.setItem("userData", JSON.stringify(userData));
    setUser(userData);
    router.push("/");
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
