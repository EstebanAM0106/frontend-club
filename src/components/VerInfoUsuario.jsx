"use client";

import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "@/context/AuthContext";
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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    console.log("User information:", user);
  }, [user]);

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
      {user ? (
        <Card sx={{ mt: 2 }}>
          <CardContent>
            <Box sx={{ mt: 2 }}>
              <Typography variant="h5">Información del Usuario</Typography>
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
