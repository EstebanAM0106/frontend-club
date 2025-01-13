"use client";

import React, { useState, useEffect, useContext } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  CircularProgress,
} from "@mui/material";
import SelectUsuario from "./SelectUsuario";
import { AuthContext } from "@/context/AuthContext";
import axios from "@/services/api"; // Asegúrate de que esta ruta es correcta

const formatDate = (dateString) => {
  const opciones = { year: "numeric", month: "long", day: "numeric" };
  return new Date(dateString).toLocaleDateString(undefined, opciones);
};

const VerInfoUsuario = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { user } = useContext(AuthContext);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    console.log("User information:", user);
  }, [user]);

  useEffect(() => {
    const fetchSelectedUser = async () => {
      if (selectedUserId) {
        setLoading(true);
        try {
          const response = await axios.get(`/usuarios/${selectedUserId}`);
          setSelectedUser(response.data);
          setError(null);
        } catch (err) {
          setError(
            err.response?.data?.message ||
              "Error al obtener la información del usuario."
          );
          setSelectedUser(null);
        } finally {
          setLoading(false);
        }
      } else {
        setSelectedUser(null);
      }
    };

    fetchSelectedUser();
  }, [selectedUserId]);

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Typography color="error" sx={{ mt: 2 }}>
        {error}
      </Typography>
    );
  }

  return (
    <Box>
      <SelectUsuario
        value={selectedUserId}
        onChange={(e) => setSelectedUserId(e.target.value)}
      />
      {selectedUser && (
        <Card sx={{ mt: 2 }}>
          <CardContent>
            <Box sx={{ mt: 2 }}>
              <Typography variant="h5">
                Información del Usuario Seleccionado
              </Typography>
              <Typography>
                <strong>Nombre:</strong> {selectedUser.Nombre}
              </Typography>
              <Typography>
                <strong>Apellido:</strong> {selectedUser.Apellido}
              </Typography>
              <Typography>
                <strong>Email:</strong> {selectedUser.Email}
              </Typography>
              <Typography>
                <strong>Rol:</strong> {selectedUser.Rol}
              </Typography>
              <Typography>
                <strong>Género:</strong> {selectedUser.Genero}
              </Typography>
              <Typography>
                <strong>Fecha de Nacimiento:</strong>{" "}
                {formatDate(selectedUser.Fecha_Nacimiento)}
              </Typography>
              {/* Añadir más campos según la estructura de selectedUser */}
            </Box>
          </CardContent>
        </Card>
      )}
      {user ? (
        <Card sx={{ mt: 2 }}>
          <CardContent>
            <Box sx={{ mt: 2 }}>
              <Typography variant="h5">
                Información del Usuario Logeado
              </Typography>
              <Typography>
                <strong>Nombre:</strong> {user.user.Nombre}
              </Typography>
              <Typography>
                <strong>Apellido:</strong> {user.user.Apellido}
              </Typography>
              <Typography>
                <strong>Email:</strong> {user.user.email}
              </Typography>
              <Typography>
                <strong>Rol:</strong> {user.user.role}
              </Typography>
              <Typography>
                <strong>Género:</strong> {user.user.Genero}
              </Typography>
              <Typography>
                <strong>Fecha de Nacimiento:</strong>{" "}
                {formatDate(user.user.Fecha_Nacimiento)}
              </Typography>
              {/* Añadir más campos según la estructura de user */}
            </Box>
          </CardContent>
        </Card>
      ) : (
        <Typography sx={{ mt: 2 }}>
          No se encontró información del usuario.
        </Typography>
      )}
    </Box>
  );
};

export default VerInfoUsuario;
