"use client";

import React, { useEffect, useState, useContext } from "react";
import axios from "@/services/api";
import {
  Box,
  Button,
  Container,
  Grid2,
  Paper,
  Typography,
  Alert,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { AuthContext } from "@/context/AuthContext";

// Componente para cada evento
const EventCard = ({ evento, onDelete, onEdit }) => {
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
    </Paper>
  );
};

// Componente principal
const ListaActividades = () => {
  const { user } = useContext(AuthContext);
  const [eventos, setEventos] = useState([]);
  const [inscripciones, setInscripciones] = useState([]);
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
        setError("Error al obtener la lista de eventos.");
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
      setError("No se pudo eliminar el evento. Por favor, intenta nuevamente.");
    } finally {
      setDeleteDialog({ open: false, id: null });
    }
  };

  const cancelDelete = () => {
    setDeleteDialog({ open: false, id: null });
  };

  const handleEdit = (evento) => {
    // Implementar la lógica de edición
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
        </>
      )}
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
