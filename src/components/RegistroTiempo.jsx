"use client";

import React, { useState, useEffect } from "react";
import {
  TextField,
  CircularProgress,
  Button,
  Box,
  Typography,
  Alert,
} from "@mui/material";
import axios from "@/services/api";
import SelectEvento from "@/components/SelectEvento";
import SelectUsuarioFiltrado from "@/components/SelectUsuariofiltrado";
import useFetchInscripciones from "@/services/useFetchInscripciones";
import useFetchUsuarios from "@/services/useFetchUsuarios";

const RegistroTiempo = () => {
  const [selectedEvento, setSelectedEvento] = useState("");
  const [selectedUsuario, setSelectedUsuario] = useState("");
  const [tiempo, setTiempo] = useState("");
  const [usuariosInscritos, setUsuariosInscritos] = useState([]);
  const [loadingUsuarios, setLoadingUsuarios] = useState(false);
  const [errorUsuarios, setErrorUsuarios] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const { inscripciones } = useFetchInscripciones();
  const { usuarios } = useFetchUsuarios();

  useEffect(() => {
    if (selectedEvento) {
      setLoadingUsuarios(true);
      const inscritos = inscripciones
        .filter(
          (inscripcion) => inscripcion.ID_Evento === parseInt(selectedEvento)
        )
        .map((inscripcion) => {
          const usuario = usuarios.find(
            (u) => u.ID_Usuario === inscripcion.ID_Usuario
          );
          return {
            ID_Usuario: inscripcion.ID_Usuario,
            Nombre: `${usuario.Nombre} ${usuario.Apellido}`, // Combine nombre and apellido
          };
        });
      setUsuariosInscritos(inscritos);
      setLoadingUsuarios(false);
    }
  }, [selectedEvento, inscripciones, usuarios]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/registrotiempo", {
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
      />
      {selectedEvento && (
        <>
          <SelectUsuarioFiltrado
            value={selectedUsuario}
            onChange={(e) => setSelectedUsuario(e.target.value)}
            usuarios={usuariosInscritos}
            loading={loadingUsuarios}
            error={errorUsuarios}
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
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
          >
            Registrar
          </Button>
        </>
      )}
    </Box>
  );
};

export default RegistroTiempo;
