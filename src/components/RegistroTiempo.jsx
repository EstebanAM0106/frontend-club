/**
 * Componente RegistroTiempo
 *
 * Este componente permite registrar el tiempo de un usuario en un evento específico.
 *
 * @component
 *
 * @returns {JSX.Element} El formulario para registrar el tiempo.
 *
 * @example
 * <RegistroTiempo />
 *
 * @description
 * El componente utiliza varios estados para manejar la selección del evento,
 * la selección del usuario, el tiempo ingresado, los usuarios inscritos en el evento,
 * el estado de carga y los mensajes de error y éxito.
 *
 * @function
 * @name RegistroTiempo
 *
 * @property {string} selectedEvento - El ID del evento seleccionado.
 * @property {string} selectedUsuario - El ID del usuario seleccionado.
 * @property {string} tiempo - El tiempo registrado en formato HH:MM:SS.SSS.
 * @property {Array} usuariosInscritos - Lista de usuarios inscritos en el evento seleccionado.
 * @property {boolean} loadingUsuarios - Estado de carga de los usuarios inscritos.
 * @property {string|null} errorUsuarios - Mensaje de error al cargar los usuarios inscritos.
 * @property {string} successMessage - Mensaje de éxito al registrar el tiempo.
 *
 * @function useEffect
 * @description
 * Hook que se ejecuta cuando cambia el evento seleccionado.
 * Carga los usuarios inscritos en el evento seleccionado.
 *
 * @function handleSubmit
 * @description
 * Maneja el envío del formulario para registrar el tiempo.
 * Envía una solicitud POST al servidor con los datos del evento, usuario y tiempo.
 *
 * @requires @mui/material
 * @requires axios
 * @requires SelectEvento
 * @requires SelectUsuarioFiltrado
 */
"use client";

import React, { useState, useEffect } from "react";
import { Box, Button, Typography, Alert, TextField } from "@mui/material";
import axios from "@/services/api";
import SelectEvento from "@/components/SelectEvento";
import SelectUsuarioFiltrado from "@/components/SelectUsuariofiltrado";
import useFetchTiempo from "@/services/useFetchTiempo"; // Import the hook

const RegistroTiempo = () => {
  const [selectedEvento, setSelectedEvento] = useState("");
  const [selectedUsuario, setSelectedUsuario] = useState("");
  const [tiempo, setTiempo] = useState("");
  const [usuariosInscritos, setUsuariosInscritos] = useState([]);
  const [loadingUsuarios, setLoadingUsuarios] = useState(false);
  const [errorUsuarios, setErrorUsuarios] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  const { fetchTiempos } = useFetchTiempo(); // Destructure fetchTiempos from the hook

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
    setSuccessMessage("");
    setErrorUsuarios(null); // Reset error message
    console.log("Submitting form..."); // Debugging
    try {
      const response = await axios.post("/registroTiempo", {
        ID_Evento: selectedEvento,
        ID_Usuario: selectedUsuario,
        Tiempo: tiempo,
      });
      console.log("Response:", response); // Debugging
      if (response.status === 200 || response.status === 201) {
        setSuccessMessage("Tiempo registrado con éxito");
        setErrorUsuarios(null); // Clear error on success
        setSelectedEvento("");
        setSelectedUsuario("");
        setTiempo("");
        fetchTiempos(); // Refresh the registros de tiempo
      } else {
        throw new Error("Error inesperado al registrar el tiempo.");
      }
    } catch (err) {
      console.error("Error during submission:", err); // Debugging
      setSuccessMessage(""); // Clear success message on error
      setErrorUsuarios(
        err.response?.data?.errors
          ? err.response.data.errors.map((error) => error.msg).join(", ")
          : "Error al registrar el tiempo."
      );
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
      {errorUsuarios && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {errorUsuarios}
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
            sx={{ mb: 3 }} // Añadir margen inferior
          />
          <Button type="submit" variant="contained" color="primary">
            Registrar
          </Button>
        </>
      )}
    </Box>
  );
};

export default RegistroTiempo;
