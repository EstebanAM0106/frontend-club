"use client";

import React, { useEffect, useState } from "react";
import axios from "@/services/api";
import Menu from "@/components/Menu"; // Importar el componente de menú
import { useRouter } from "next/navigation";
import {
  Box,
  Button,
  Container,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";

const ListaActividades = () => {
  const [eventos, setEventos] = useState([]);
  const [editEvento, setEditEvento] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchEventos = async () => {
      try {
        const response = await axios.get("/eventos");
        setEventos(response.data);
      } catch (error) {
        console.error("Error obteniendo eventos:", error);
      }
    };

    fetchEventos();
  }, []);

  const eliminarEvento = async (id) => {
    try {
      await axios.delete(`/eventos/${id}`);
      setEventos(eventos.filter((evento) => evento.ID_Evento !== id));
      alert("Evento eliminado con éxito");
    } catch (error) {
      console.error("Error eliminando evento:", error);
    }
  };

  const editarEvento = (evento) => {
    setEditEvento(evento);
  };

  const handleEditChange = (e) => {
    setEditEvento({
      ...editEvento,
      [e.target.name]: e.target.value,
    });
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/eventos/${editEvento.ID_Evento}`, editEvento);
      setEventos(
        eventos.map((evento) =>
          evento.ID_Evento === editEvento.ID_Evento ? editEvento : evento
        )
      );
      setEditEvento(null);
      alert("Evento actualizado con éxito");
    } catch (error) {
      console.error("Error actualizando evento:", error);
    }
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "2-digit", day: "2-digit" };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  return (
    <Container>
      <Menu /> {/* Agregar el componente de menú */}
      <Typography variant="h4" gutterBottom>
        Lista de Eventos
      </Typography>
      <Grid container spacing={2}>
        {eventos.length > 0 ? (
          eventos.map((evento) => (
            <Grid item xs={12} sm={6} md={4} key={evento.ID_Evento}>
              <Paper elevation={3} sx={{ padding: 2 }}>
                <Typography variant="h6">{evento.Nombre}</Typography>
                <Typography>
                  Fecha de Convocatoria: {formatDate(evento.Fecha_Convocatoria)}
                </Typography>
                <Typography>
                  Fecha de Inicio: {formatDate(evento.Fecha_Inicio)}
                </Typography>
                <Typography>
                  Fecha de Fin: {formatDate(evento.Fecha_Fin)}
                </Typography>
                <Typography>Modalidad: {evento.Modalidad}</Typography>
                <Typography>Costo: {evento.Costo}</Typography>
                <Typography>Sede: {evento.SedeNombre}</Typography>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => eliminarEvento(evento.ID_Evento)}
                  sx={{ marginTop: 1 }}
                >
                  Eliminar
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => editarEvento(evento)}
                  sx={{ marginTop: 1, marginLeft: 1 }}
                >
                  Editar
                </Button>
              </Paper>
            </Grid>
          ))
        ) : (
          <Typography>No hay eventos registrados.</Typography>
        )}
      </Grid>
      {editEvento && (
        <Box component="form" onSubmit={handleEditSubmit} sx={{ marginTop: 4 }}>
          <Typography variant="h5" gutterBottom>
            Editar Evento
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Nombre del evento"
                name="Nombre"
                value={editEvento.Nombre}
                onChange={handleEditChange}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                type="date"
                label="Fecha de Convocatoria"
                name="Fecha_Convocatoria"
                value={editEvento.Fecha_Convocatoria}
                onChange={handleEditChange}
                required
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                type="date"
                label="Fecha de Inicio de Inscripciones"
                name="Fecha_Inicio_Inscripciones"
                value={editEvento.Fecha_Inicio_Inscripciones}
                onChange={handleEditChange}
                required
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                type="date"
                label="Fecha de Cierre de Inscripciones"
                name="Fecha_Cierre_Inscripciones"
                value={editEvento.Fecha_Cierre_Inscripciones}
                onChange={handleEditChange}
                required
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                type="date"
                label="Fecha de Inicio"
                name="Fecha_Inicio"
                value={editEvento.Fecha_Inicio}
                onChange={handleEditChange}
                required
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                type="date"
                label="Fecha de Fin"
                name="Fecha_Fin"
                value={editEvento.Fecha_Fin}
                onChange={handleEditChange}
                required
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Modalidad"
                name="Modalidad"
                value={editEvento.Modalidad}
                onChange={handleEditChange}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                type="number"
                label="Costo"
                name="Costo"
                value={editEvento.Costo}
                onChange={handleEditChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={4}
                label="Requisitos"
                name="Requisitos"
                value={editEvento.Requisitos}
                onChange={handleEditChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={4}
                label="Reglas"
                name="Reglas"
                value={editEvento.Reglas}
                onChange={handleEditChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={4}
                label="Horarios"
                name="Horarios"
                value={editEvento.Horarios}
                onChange={handleEditChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                type="number"
                label="ID de la Sede"
                name="ID_Sede"
                value={editEvento.ID_Sede}
                onChange={handleEditChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                sx={{ marginRight: 1 }}
              >
                Actualizar
              </Button>
              <Button
                type="button"
                variant="outlined"
                onClick={() => setEditEvento(null)}
              >
                Cancelar
              </Button>
            </Grid>
          </Grid>
        </Box>
      )}
    </Container>
  );
};

export default ListaActividades;
