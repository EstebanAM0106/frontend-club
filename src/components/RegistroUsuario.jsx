"use client";

import React, { useState } from "react";
import {
  TextField,
  Button,
  Box,
  Typography,
  Alert,
  MenuItem,
} from "@mui/material";
import axios from "@/services/api";

const RegistroUsuario = () => {
  const [formData, setFormData] = useState({
    Nombre: "",
    Apellido: "",
    Email: "",
    Password: "",
    Rol: "",
    Genero: "",
    Fecha_Nacimiento: "", // Cambiado a Fecha_Nacimiento
  });
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/usuarios", formData);
      setSuccessMessage("Usuario registrado con éxito");
      setFormData({
        Nombre: "",
        Apellido: "",
        Email: "",
        Password: "",
        Rol: "",
        Genero: "",
        Fecha_Nacimiento: "", // Cambiado a Fecha_Nacimiento
      });
    } catch (err) {
      setErrorMessage("Error al registrar el usuario.");
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Registrar Usuario
      </Typography>
      {successMessage && (
        <Alert severity="success" sx={{ mb: 2 }}>
          {successMessage}
        </Alert>
      )}
      {errorMessage && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {errorMessage}
        </Alert>
      )}
      <TextField
        fullWidth
        label="Nombre"
        name="Nombre"
        value={formData.Nombre}
        onChange={handleChange}
        required
        sx={{ mt: 2 }}
      />
      <TextField
        fullWidth
        label="Apellido"
        name="Apellido"
        value={formData.Apellido}
        onChange={handleChange}
        required
        sx={{ mt: 2 }}
      />
      <TextField
        fullWidth
        label="Email"
        name="Email"
        type="email"
        value={formData.Email}
        onChange={handleChange}
        required
        sx={{ mt: 2 }}
      />
      <TextField
        fullWidth
        label="Password"
        name="Password"
        type="password"
        value={formData.Password}
        onChange={handleChange}
        required
        sx={{ mt: 2 }}
      />
      <TextField
        fullWidth
        select
        label="Rol"
        name="Rol"
        value={formData.Rol}
        onChange={handleChange}
        required
        sx={{ mt: 2 }}
      >
        <MenuItem value="user">User</MenuItem>
        <MenuItem value="admin">Admin</MenuItem>
      </TextField>
      <TextField
        fullWidth
        select
        label="Género"
        name="Genero"
        value={formData.Genero}
        onChange={handleChange}
        required
        sx={{ mt: 2 }}
      >
        <MenuItem value="masculino">Masculino</MenuItem>
        <MenuItem value="femenino">Femenino</MenuItem>
        <MenuItem value="otro">Otro</MenuItem>
      </TextField>
      <TextField
        fullWidth
        label="Fecha de Nacimiento"
        name="Fecha_Nacimiento" // Cambiado a Fecha_Nacimiento
        type="date"
        value={formData.Fecha_Nacimiento} // Cambiado a Fecha_Nacimiento
        onChange={handleChange}
        required
        InputLabelProps={{ shrink: true }}
        sx={{ mt: 2 }}
      />
      <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
        Registrar
      </Button>
    </Box>
  );
};

export default RegistroUsuario;
