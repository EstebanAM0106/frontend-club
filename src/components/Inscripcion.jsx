"use client";

import React, { useContext, useState, useEffect } from "react";
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
import SelectUsuario from "@/components/SelectUsuario";
import SelectEvento from "@/components/SelectEvento";
import useFetchInscripciones from "@/services/useFetchInscripciones";

// Componente para cada inscripción
const InscripcionCard = ({ inscripcion, onDelete }) => {
  return (
    <Paper elevation={3} sx={{ padding: 2 }}>
      <Typography>
        <strong>ID Evento:</strong> {inscripcion.ID_Evento}
      </Typography>
      <Typography>
        <strong>ID Usuario:</strong> {inscripcion.ID_Usuario}
      </Typography>
      <Box sx={{ mt: 2 }}>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => onDelete(inscripcion.ID_Inscripcion)}
          sx={{ mr: 1 }}
        >
          Eliminar
        </Button>
      </Box>
    </Paper>
  );
};

// Componente principal
const Inscripcion = () => {
  const { user } = useContext(AuthContext);
  const { inscripciones, loading, error, setInscripciones } =
    useFetchInscripciones();
  const [deleteDialog, setDeleteDialog] = useState({ open: false, id: null });
  const [formData, setFormData] = useState({
    ID_Evento: "",
    ID_Usuario: "",
    Fecha_Inscripcion: "",
    Nombre_Inscripcion: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/inscripciones", formData);
      setFormData({
        ID_Evento: "",
        ID_Usuario: "",
        Fecha_Inscripcion: "",
        Nombre_Inscripcion: "",
      });
      fetchInscripciones();
      alert("Inscripción registrada con éxito");
    } catch (err) {
      setError("Error al registrar la inscripción.");
    }
  };

  const handleDelete = (id) => {
    setDeleteDialog({ open: true, id });
  };

  const confirmDelete = async () => {
    const { id } = deleteDialog;
    try {
      await axios.delete(`/inscripciones/${id}`);
      fetchInscripciones();
      alert("Inscripción eliminada con éxito");
    } catch (err) {
      setError("Error al eliminar la inscripción.");
    } finally {
      setDeleteDialog({ open: false, id: null });
    }
  };

  const cancelDelete = () => {
    setDeleteDialog({ open: false, id: null });
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom sx={{ mt: 2 }}>
        Inscripciones
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
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 4 }}>
            <Grid2 container spacing={2}>
              <Grid2 xs={12} sm={6}>
                <SelectEvento
                  value={formData.ID_Evento}
                  onChange={(e) =>
                    setFormData({ ...formData, ID_Evento: e.target.value })
                  }
                />
              </Grid2>
              <Grid2 xs={12} sm={6}>
                <SelectUsuario
                  value={formData.ID_Usuario}
                  onChange={(e) =>
                    setFormData({ ...formData, ID_Usuario: e.target.value })
                  }
                />
              </Grid2>
              <Grid2 xs={12}>
                <Button type="submit" variant="contained" color="primary">
                  Registrar
                </Button>
              </Grid2>
            </Grid2>
          </Box>
          <Grid2 container spacing={2} sx={{ mt: 4 }}>
            {inscripciones.map((inscripcion) => (
              <Grid2 xs={12} sm={6} md={4} key={inscripcion.ID_Inscripcion}>
                <InscripcionCard
                  inscripcion={inscripcion}
                  onDelete={handleDelete}
                />
              </Grid2>
            ))}
          </Grid2>
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
            ¿Estás seguro de que deseas eliminar esta inscripción? Esta acción
            no se puede deshacer.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={cancelDelete}>Cancelar</Button>
          <Button onClick={confirmDelete} color="secondary">
            Eliminar
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Inscripcion;
