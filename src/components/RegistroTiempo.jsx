"use client";

import React, { useState, useEffect } from "react";
import { Box, Button, Typography, Alert, TextField } from "@mui/material";
import axios from "@/services/api";
import SelectEvento from "@/components/SelectEvento";
import SelectUsuarioFiltrado from "@/components/SelectUsuariofiltrado";

const RegistroTiempo = () => {
  const [selectedEvento, setSelectedEvento] = useState("");
  const [selectedUsuario, setSelectedUsuario] = useState("");
  const [tiempo, setTiempo] = useState("");
  const [usuariosInscritos, setUsuariosInscritos] = useState([]);
  const [loadingUsuarios, setLoadingUsuarios] = useState(false);
  const [errorUsuarios, setErrorUsuarios] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    if (selectedEvento) {
      const fetchUsuariosInscritos = async () => {
        setLoadingUsuarios(true);
        try {
          const response = await axios.get(
            `/eventos/${selectedEvento}/usuarios`
          );
          setUsuariosInscritos(response.data);
          setErrorUsuarios(null);
        } catch (err) {
          setErrorUsuarios("Error al cargar los usuarios inscritos.");
        } finally {
          setLoadingUsuarios(false);
        }
      };

      fetchUsuariosInscritos();
    }
  }, [selectedEvento]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/tiempos", {
        ID_Evento: selectedEvento,
        ID_Usuario: selectedUsuario,
        Tiempo: tiempo,
      });
      setSuccessMessage("Tiempo registrado con éxito");
      setSelectedEvento("");
      setSelectedUsuario("");
      setTiempo("");
    } catch (err) {
      setErrorUsuarios("Error al registrar el tiempo.");
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Registrar Tiempo
      </Typography>
      {successMessage && (
        <Alert severity="success" sx={{ mb: 2 }}>
          {successMessage}
        </Alert>
      )}
      <SelectEvento
        value={selectedEvento}
        onChange={(e) => setSelectedEvento(e.target.value)}
        sx={{ mb: 3 }} // Añadir margen inferior
      />
      {selectedEvento && (
        <>
          <SelectUsuarioFiltrado
            value={selectedUsuario}
            onChange={(e) => setSelectedUsuario(e.target.value)}
            usuarios={usuariosInscritos}
            loading={loadingUsuarios}
            error={errorUsuarios}
            sx={{ mb: 3 }} // Añadir margen inferior
          />
          <TextField
            fullWidth
            label="Tiempo (HH:MM:SS.SSS)"
            value={tiempo}
            onChange={(e) => setTiempo(e.target.value)}
            placeholder="00:00:00.000"
            required
            sx={{ mt: 2 }}
          />
        </>
      )}
      <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
        Registrar
      </Button>
    </Box>
  );
};

export default RegistroTiempo;
