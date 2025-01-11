"use client";

import React, { useContext, useState } from "react";
import axios from "@/services/api";
import {
  Box,
  Button,
  Typography,
  Alert,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Paper,
  Grid,
} from "@mui/material";
import { AuthContext } from "@/context/AuthContext";
import useFetchEventos from "@/services/useFetchEventos";
import EventCard from "@/components/EventCard"; // Asegúrate de importar EventCard

const ListaActividades = () => {
  const { user } = useContext(AuthContext);
  const { eventos, loading, error, setEventos, fetchEventos } =
    useFetchEventos();
  const [deleteDialog, setDeleteDialog] = useState({ open: false, id: null });

  const handleDelete = (id) => {
    setDeleteDialog({ open: true, id });
  };

  const confirmDelete = async () => {
    const { id } = deleteDialog;
    try {
      await axios.delete(`/eventos/${id}`);
      setEventos(eventos.filter((evento) => evento.ID_Evento !== id));
      setDeleteDialog({ open: false, id: null });
    } catch (err) {
      console.error("Error al eliminar el evento:", err);
    }
  };

  const cancelDelete = () => {
    setDeleteDialog({ open: false, id: null });
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Lista de Actividades
      </Typography>
      {loading ? (
        <CircularProgress />
      ) : error ? (
        <Alert severity="error">{error}</Alert>
      ) : (
        <Grid container spacing={2}>
          {eventos.map((evento) => (
            <Grid item xs={12} sm={6} md={4} key={evento.ID_Evento}>
              <EventCard
                evento={evento}
                onDelete={handleDelete}
                fetchEventos={fetchEventos}
              />
            </Grid>
          ))}
        </Grid>
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
            ¿Estás seguro de que deseas eliminar esta actividad? Esta acción no
            se puede deshacer.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={cancelDelete} color="secondary">
            Cancelar
          </Button>
          <Button onClick={confirmDelete} color="primary">
            Eliminar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ListaActividades;
