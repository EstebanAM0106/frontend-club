"use client";

import React, { useState } from "react";
import axios from "@/services/api";
import {
  Box,
  Button,
  Container,
  Grid2,
  TextField,
  Typography,
} from "@mui/material";

const Registro = () => {
  const [evento, setEvento] = useState({
    Nombre: "",
    Fecha_Convocatoria: "",
    Fecha_Inicio_Inscripciones: "",
    Fecha_Cierre_Inscripciones: "",
    Fecha_Inicio: "",
    Fecha_Fin: "",
    Modalidad: "",
    Costo: "",
    Requisitos: "",
    Reglas: "",
    Horarios: "",
    ID_Sede: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setEvento({
      ...evento,
      [e.target.name]: e.target.value,
    });
  };

  const validate = () => {
    const newErrors = {};
    if (!evento.Nombre) newErrors.Nombre = "El nombre es obligatorio.";
    if (!evento.Fecha_Convocatoria)
      newErrors.Fecha_Convocatoria = "La fecha de convocatoria es obligatoria.";
    if (!evento.Fecha_Inicio_Inscripciones)
      newErrors.Fecha_Inicio_Inscripciones =
        "La fecha de inicio de inscripciones es obligatoria.";
    if (!evento.Fecha_Cierre_Inscripciones)
      newErrors.Fecha_Cierre_Inscripciones =
        "La fecha de cierre de inscripciones es obligatoria.";
    if (!evento.Fecha_Inicio)
      newErrors.Fecha_Inicio = "La fecha de inicio es obligatoria.";
    if (!evento.Fecha_Fin)
      newErrors.Fecha_Fin = "La fecha de fin es obligatoria.";
    if (!evento.Modalidad) newErrors.Modalidad = "La modalidad es obligatoria.";
    if (!evento.Costo) newErrors.Costo = "El costo es obligatorio.";
    if (!evento.ID_Sede) newErrors.ID_Sede = "El ID de la sede es obligatorio.";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const response = await axios.post("/eventos", evento);
      alert("Evento registrado con éxito!");
      setEvento({
        Nombre: "",
        Fecha_Convocatoria: "",
        Fecha_Inicio_Inscripciones: "",
        Fecha_Cierre_Inscripciones: "",
        Fecha_Inicio: "",
        Fecha_Fin: "",
        Modalidad: "",
        Costo: "",
        Requisitos: "",
        Reglas: "",
        Horarios: "",
        ID_Sede: "",
      }); // Resetear el formulario
      setErrors({});
    } catch (error) {
      console.error("Error registrando el evento:", error);
      alert("Error registrando el evento. Por favor, inténtalo de nuevo.");
    }
  };

  return (
    <>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ mt: 4 }}
      >
        <Typography
          variant="h4"
          gutterBottom
        >
          Registrar Evento
        </Typography>
        <Grid2
          container
          spacing={2}
          columns={{
            xs: 1,
            sm: 2,
          }}
        >
          <Grid2 size={2}>
            <TextField
              fullWidth
              label="Nombre del Evento"
              name="Nombre"
              value={evento.Nombre}
              onChange={handleChange}
              required
              error={!!errors.Nombre}
              helperText={errors.Nombre}
            />
          </Grid2>
          <Grid2 size={1}>
            <TextField
              fullWidth
              type="date"
              label="Fecha de Convocatoria"
              name="Fecha_Convocatoria"
              value={evento.Fecha_Convocatoria}
              onChange={handleChange}
              required
              InputLabelProps={{ shrink: true }}
              error={!!errors.Fecha_Convocatoria}
              helperText={errors.Fecha_Convocatoria}
            />
          </Grid2>
          <Grid2 size={1}>
            <TextField
              fullWidth
              type="date"
              label="Fecha de Inicio de Inscripciones"
              name="Fecha_Inicio_Inscripciones"
              value={evento.Fecha_Inicio_Inscripciones}
              onChange={handleChange}
              required
              InputLabelProps={{ shrink: true }}
              error={!!errors.Fecha_Inicio_Inscripciones}
              helperText={errors.Fecha_Inicio_Inscripciones}
            />
          </Grid2>
          <Grid2 size={1}>
            <TextField
              fullWidth
              type="date"
              label="Fecha de Cierre de Inscripciones"
              name="Fecha_Cierre_Inscripciones"
              value={evento.Fecha_Cierre_Inscripciones}
              onChange={handleChange}
              required
              InputLabelProps={{ shrink: true }}
              error={!!errors.Fecha_Cierre_Inscripciones}
              helperText={errors.Fecha_Cierre_Inscripciones}
            />
          </Grid2>
          <Grid2 size={1}>
            <TextField
              fullWidth
              type="date"
              label="Fecha de Inicio"
              name="Fecha_Inicio"
              value={evento.Fecha_Inicio}
              onChange={handleChange}
              required
              InputLabelProps={{ shrink: true }}
              error={!!errors.Fecha_Inicio}
              helperText={errors.Fecha_Inicio}
            />
          </Grid2>
          <Grid2 size={1}>
            <TextField
              fullWidth
              type="date"
              label="Fecha de Fin"
              name="Fecha_Fin"
              value={evento.Fecha_Fin}
              onChange={handleChange}
              required
              InputLabelProps={{ shrink: true }}
              error={!!errors.Fecha_Fin}
              helperText={errors.Fecha_Fin}
            />
          </Grid2>
          <Grid2 size={1}>
            <TextField
              fullWidth
              label="Modalidad"
              name="Modalidad"
              value={evento.Modalidad}
              onChange={handleChange}
              required
              error={!!errors.Modalidad}
              helperText={errors.Modalidad}
            />
          </Grid2>
          <Grid2 size={1}>
            <TextField
              fullWidth
              type="number"
              label="Costo"
              name="Costo"
              value={evento.Costo}
              onChange={handleChange}
              required
              error={!!errors.Costo}
              helperText={errors.Costo}
            />
          </Grid2>
          <Grid2 size={2}>
            <TextField
              fullWidth
              multiline
              rows={4}
              label="Requisitos"
              name="Requisitos"
              value={evento.Requisitos}
              onChange={handleChange}
              error={!!errors.Requisitos}
              helperText={errors.Requisitos}
            />
          </Grid2>
          <Grid2 size={2}>
            <TextField
              fullWidth
              multiline
              rows={4}
              label="Reglas"
              name="Reglas"
              value={evento.Reglas}
              onChange={handleChange}
              error={!!errors.Reglas}
              helperText={errors.Reglas}
            />
          </Grid2>
          <Grid2 size={2}>
            <TextField
              fullWidth
              multiline
              rows={4}
              label="Horarios"
              name="Horarios"
              value={evento.Horarios}
              onChange={handleChange}
              error={!!errors.Horarios}
              helperText={errors.Horarios}
            />
          </Grid2>
          <Grid2 size={1}>
            <TextField
              fullWidth
              type="number"
              label="ID de la Sede"
              name="ID_Sede"
              value={evento.ID_Sede}
              onChange={handleChange}
              required
              error={!!errors.ID_Sede}
              helperText={errors.ID_Sede}
            />
          </Grid2>
          <Grid2 size={2}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
            >
              Registrar
            </Button>
          </Grid2>
        </Grid2>
      </Box>
    </>
  );
};

export default Registro;
