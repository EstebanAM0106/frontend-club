"use client";

import React, { useState } from "react";
import axios from "@/services/api";
import { TextField, Button, Container, Typography, Box } from "@mui/material";

const Login = () => {
  const [credenciales, setCredenciales] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setCredenciales({
      ...credenciales,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/login", credenciales);
      localStorage.setItem("token", response.data.token); // Guardar el token en localStorage
      alert("Inicio de sesión exitoso");
    } catch (error) {
      console.error("Error iniciando sesión:", error);
      alert("Error de autenticación. Verifica tus credenciales.");
    }
  };

  return (
    <Container maxWidth="sm">
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ mt: 3 }}
      >
        <Typography
          variant="h4"
          component="h2"
          gutterBottom
        >
          Iniciar Sesión
        </Typography>
        <TextField
          fullWidth
          type="email"
          name="email"
          label="Email"
          value={credenciales.email}
          onChange={handleChange}
          required
          margin="normal"
        />
        <TextField
          fullWidth
          type="password"
          name="password"
          label="Contraseña"
          value={credenciales.password}
          onChange={handleChange}
          required
          margin="normal"
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 2 }}
        >
          Iniciar Sesión
        </Button>
      </Box>
    </Container>
  );
};

export default Login;
