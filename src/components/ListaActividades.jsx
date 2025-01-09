"use client";

import React, { useEffect, useState, useContext } from "react";
import axios from "@/services/api";
import {
  Box,
  Button,
  Container,
  Grid2,
  Paper,
  TextField,
  Typography,
  Alert,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { AuthContext } from "@/context/AuthContext";

// Componente para cada evento
const EventCard = ({ evento, onDelete, onEdit, isAdmin }) => {
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "2-digit", day: "2-digit" };
    return new Date(dateString).toLocaleDateString("es-ES", options);
  };

  return (
    <Paper elevation={3} sx={{ padding: 2 }}>
      <Typography variant="h6">{evento.Nombre}</Typography>
      <Typography>
        <strong>Convocatoria:</strong> {formatDate(evento.Fecha_Convocatoria)}
      </Typography>
      <Typography>
        <strong>Inicio:</strong> {formatDate(evento.Fecha_Inicio)}
      </Typography>
      <Typography>
        <strong>Fin:</strong> {formatDate(evento.Fecha_Fin)}
      </Typography>
      <Typography>
        <strong>Modalidad:</strong> {evento.Modalidad}
      </Typography>
      <Typography>
        <strong>Costo:</strong> ${evento.Costo}
      </Typography>
      <Typography>
        <strong>Sede:</strong> {evento.SedeNombre}
      </Typography>
      {isAdmin && (
        <Box sx={{ mt: 2 }}>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => onDelete(evento.ID_Evento)}
            sx={{ mr: 1 }}
          >
            Eliminar
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={() => onEdit(evento)}
          >
            Editar
          </Button>
        </Box>
      )}
    </Paper>
  );
};

// Componente para el formulario de edición
const EditEventForm = ({ evento, onCancel, onSave }) => {
  const [formData, setFormData] = useState({ ...evento });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        Editar Evento
      </Typography>
      <Grid2 container spacing={2}>
        <Grid2 xs={12} sm={6}>
          <TextField
            fullWidth
            label="Nombre del Evento"
            name="Nombre"
            value={formData.Nombre}
            onChange={handleChange}
            required
          />
        </Grid2>
        <Grid2 xs={12} sm={6}>
          <TextField
            fullWidth
            type="date"
            label="Fecha de Convocatoria"
            name="Fecha_Convocatoria"
            value={formData.Fecha_Convocatoria}
            onChange={handleChange}
            required
            slotProps={{ inputLabel: { shrink: true } }}
          />
        </Grid2>
        <Grid2 xs={12} sm={6}>
          <TextField
            fullWidth
            type="date"
            label="Inicio de Inscripciones"
            name="Fecha_Inicio_Inscripciones"
            value={formData.Fecha_Inicio_Inscripciones}
            onChange={handleChange}
            required
            slotProps={{ inputLabel: { shrink: true } }}
          />
        </Grid2>
        <Grid2 xs={12} sm={6}>
          <TextField
            fullWidth
            type="date"
            label="Cierre de Inscripciones"
            name="Fecha_Cierre_Inscripciones"
            value={formData.Fecha_Cierre_Inscripciones}
            onChange={handleChange}
            required
            slotProps={{ inputLabel: { shrink: true } }}
          />
        </Grid2>
        <Grid2 xs={12} sm={6}>
          <TextField
            fullWidth
            type="date"
            label="Fecha de Inicio"
            name="Fecha_Inicio"
            value={formData.Fecha_Inicio}
            onChange={handleChange}
            required
            slotProps={{ inputLabel: { shrink: true } }}
          />
        </Grid2>
        <Grid2 xs={12} sm={6}>
          <TextField
            fullWidth
            type="date"
            label="Fecha de Fin"
            name="Fecha_Fin"
            value={formData.Fecha_Fin}
            onChange={handleChange}
            required
            slotProps={{ inputLabel: { shrink: true } }}
          />
        </Grid2>
        <Grid2 xs={12} sm={6}>
          <TextField
            fullWidth
            label="Modalidad"
            name="Modalidad"
            value={formData.Modalidad}
            onChange={handleChange}
            required
          />
        </Grid2>
        <Grid2 xs={12} sm={6}>
          <TextField
            fullWidth
            type="number"
            label="Costo"
            name="Costo"
            value={formData.Costo}
            onChange={handleChange}
            required
          />
        </Grid2>
        <Grid2 xs={12}>
          <TextField
            fullWidth
            multiline
            rows={3}
            label="Requisitos"
            name="Requisitos"
            value={formData.Requisitos}
            onChange={handleChange}
          />
        </Grid2>
        <Grid2 xs={12}>
          <TextField
            fullWidth
            multiline
            rows={3}
            label="Reglas"
            name="Reglas"
            value={formData.Reglas}
            onChange={handleChange}
          />
        </Grid2>
        <Grid2 xs={12}>
          <TextField
            fullWidth
            multiline
            rows={3}
            label="Horarios"
            name="Horarios"
            value={formData.Horarios}
            onChange={handleChange}
          />
        </Grid2>
        <Grid2 xs={12} sm={6}>
          <TextField
            fullWidth
            type="number"
            label="ID de la Sede"
            name="ID_Sede"
            value={formData.ID_Sede}
            onChange={handleChange}
            required
          />
        </Grid2>
        <Grid2 xs={12}>
          <Button
            type="submit"
            variant="contained"
            color="secondary"
            sx={{ mr: 1 }}
          >
            Actualizar
          </Button>
          <Button variant="outlined" onClick={onCancel}>
            Cancelar
          </Button>
        </Grid2>
      </Grid2>
    </Box>
  );
};

// Componente principal
const ListaActividades = () => {
  const { user } = useContext(AuthContext);
  const [eventos, setEventos] = useState([]);
  const [editEvento, setEditEvento] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deleteDialog, setDeleteDialog] = useState({ open: false, id: null });

  useEffect(() => {
    const fetchEventos = async () => {
      try {
        const response = await axios.get("/eventos");
        setEventos(response.data);
        setError(null);
      } catch (err) {
        if (err.message === "Network Error") {
          setError("Error de red: No se pudo conectar con el servidor.");
        } else if (err.response) {
          setError(
            `Error ${err.response.status}: ${
              err.response.data.message ||
              "No se pudo obtener la lista de eventos."
            }`
          );
        } else {
          setError(
            "Ocurrió un error inesperado. Por favor, intenta nuevamente más tarde."
          );
        }
      } finally {
        setLoading(false);
      }
    };

    fetchEventos();
  }, []);

  const handleDelete = (id) => {
    setDeleteDialog({ open: true, id });
  };

  const confirmDelete = async () => {
    const { id } = deleteDialog;
    try {
      await axios.delete(`/eventos/${id}`);
      setEventos(eventos.filter((evento) => evento.ID_Evento !== id));
      alert("Evento eliminado con éxito");
    } catch (err) {
      console.error("Error eliminando evento:", err);
      setError("No se pudo eliminar el evento. Por favor, intenta nuevamente.");
    } finally {
      setDeleteDialog({ open: false, id: null });
    }
  };

  const cancelDelete = () => {
    setDeleteDialog({ open: false, id: null });
  };

  const handleEdit = (evento) => {
    setEditEvento(evento);
  };

  const handleSaveEdit = async (updatedEvento) => {
    try {
      await axios.put(`/eventos/${updatedEvento.ID_Evento}`, updatedEvento);
      setEventos(
        eventos.map((evento) =>
          evento.ID_Evento === updatedEvento.ID_Evento ? updatedEvento : evento
        )
      );
      setEditEvento(null);
      alert("Evento actualizado con éxito");
    } catch (err) {
      console.error("Error actualizando evento:", err);
      setError(
        "No se pudo actualizar el evento. Por favor, intenta nuevamente."
      );
    }
  };

  return (
    <>
      <Typography variant="h4" gutterBottom sx={{ mt: 2 }}>
        Lista de Eventos {user ? JSON.stringify(user.user.email) : ""}
      </Typography>
      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}
          {!error && (
            <Grid2 container spacing={2}>
              {eventos.length > 0 ? (
                eventos.map((evento) => (
                  <Grid2 xs={12} sm={6} md={4} key={evento.ID_Evento}>
                    <EventCard
                      evento={evento}
                      onDelete={handleDelete}
                      onEdit={handleEdit}
                      isAdmin={user.user.role === "admin"}
                    />
                  </Grid2>
                ))
              ) : (
                <Grid2 xs={12}>
                  <Typography>No hay eventos registrados.</Typography>
                </Grid2>
              )}
            </Grid2>
          )}
          {editEvento && (
            <EditEventForm
              evento={editEvento}
              onCancel={() => setEditEvento(null)}
              onSave={handleSaveEdit}
            />
          )}
        </>
      )}
      {/* Diálogo de confirmación para eliminación */}
      <Dialog
        open={deleteDialog.open}
        onClose={cancelDelete}
        aria-labelledby="confirm-delete-title"
        aria-describedby="confirm-delete-description"
      >
        <DialogTitle id="confirm-delete-title">
          Confirmar Eliminación
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="confirm-delete-description">
            ¿Estás seguro de que deseas eliminar este evento? Esta acción no se
            puede deshacer.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={cancelDelete}>Cancelar</Button>
          <Button onClick={confirmDelete} color="secondary">
            Eliminar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ListaActividades;
