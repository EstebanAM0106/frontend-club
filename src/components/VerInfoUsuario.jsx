"use client";

import React, { useState, useEffect } from "react";
import axios from "@/services/api";
import SelectUsuario from "./SelectUsuario";
import {
  Box,
  Typography,
  Card,
  CardContent,
  CircularProgress,
} from "@mui/material";

const formatDate = (dateString) => {
  const opciones = { year: "numeric", month: "long", day: "numeric" };
  return new Date(dateString).toLocaleDateString(undefined, opciones);
};

const VerInfoUsuario = () => {
  const [selectedUserId, setSelectedUserId] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (event) => {
    const userId = event.target.value;
    console.log("ID de usuario seleccionado:", userId); // Agregado
    setSelectedUserId(userId);
  };

  useEffect(() => {
    if (selectedUserId) {
      console.log("Realizando solicitud para el ID:", selectedUserId); // Agregado
      const fetchUserDetails = async () => {
        setLoading(true);
        try {
          const response = await axios.get(`/usuarios/${selectedUserId}`);
          console.log("Datos del usuario recibidos:", response.data); // Añadido
          setSelectedUser(response.data);
          setError(null);
        } catch (err) {
          console.error("Error al obtener detalles del usuario:", err); // Mejorado
          setError("Error al obtener los detalles del usuario.");
          setSelectedUser(null);
        } finally {
          setLoading(false);
        }
      };
      fetchUserDetails();
    } else {
      setSelectedUser(null);
      setError(null);
    }
  }, [selectedUserId]);

  return (
    <Box>
      <SelectUsuario value={selectedUserId} onChange={handleChange} />
      {loading && (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
          <CircularProgress />
        </Box>
      )}
      {error && (
        <Typography color="error" sx={{ mt: 2 }}>
          {error}
        </Typography>
      )}
      {selectedUser && (
        <Card sx={{ mt: 2 }}>
          <CardContent>
            <Box sx={{ mt: 2 }}>
              <Typography variant="h5">Información del Usuario</Typography>
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
    </Box>
  );
};

export default VerInfoUsuario;
