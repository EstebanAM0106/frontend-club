"use client";

import React, { createContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "@/services/api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          // Fetch user data from backend
          const response = await axios.get("/api/user", {
            headers: { Authorization: `Bearer ${token}` },
          });
          setUser(response.data);

          // Configure automatic logout
          const timeout = setTimeout(() => {
            logout();
          }, 360000); // 1 hour in milliseconds

          return () => clearTimeout(timeout);
        } catch (error) {
          console.error("Failed to fetch user data:", error);
          logout();
        }
      } else {
        router.push("/login");
      }
    };

    fetchUserData();
  }, [router]);

  const login = (userData) => {
    localStorage.setItem("token", userData.token);
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
