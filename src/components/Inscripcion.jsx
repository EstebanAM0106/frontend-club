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

// Componente para cada inscripción
const InscripcionCard = ({ inscripcion, onDelete }) => {
  return (
    <Paper elevation={3} sx={{ padding: 2 }}>
      <Typography variant="h6">{inscripcion.Nombre_Inscripcion}</Typography>
      <Typography>
        <strong>Fecha de Inscripción:</strong> {inscripcion.Fecha_Inscripcion}
      </Typography>
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
  const [inscripciones, setInscripciones] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deleteDialog, setDeleteDialog] = useState({ open: false, id: null });
  const [formData, setFormData] = useState({
    ID_Evento: "",
    ID_Usuario: "",
    Fecha_Inscripcion: "",
    Nombre_Inscripcion: "",
  });

  useEffect(() => {
    const fetchInscripciones = async () => {
      try {
        const response = await axios.get("/inscripciones");
        setInscripciones(response.data);
        setError(null);
      } catch (err) {
        setError("Error al obtener las inscripciones.");
      } finally {
        setLoading(false);
      }
    };

    fetchInscripciones();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/inscripciones", formData);
      setInscripciones([...inscripciones, response.data]);
      setFormData({
        ID_Evento: "",
        ID_Usuario: "",
        Fecha_Inscripcion: "",
        Nombre_Inscripcion: "",
      });
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
      setInscripciones(
        inscripciones.filter((inscripcion) => inscripcion.ID_Inscripcion !== id)
      );
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
                <TextField
                  fullWidth
                  label="ID Evento"
                  name="ID_Evento"
                  value={formData.ID_Evento}
                  onChange={handleChange}
                  required
                />
              </Grid2>
              <Grid2 xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="ID Usuario"
                  name="ID_Usuario"
                  value={formData.ID_Usuario}
                  onChange={handleChange}
                  required
                />
              </Grid2>
              <Grid2 xs={12} sm={6}>
                <TextField
                  fullWidth
                  type="date"
                  label="Fecha de Inscripción"
                  name="Fecha_Inscripcion"
                  value={formData.Fecha_Inscripcion}
                  onChange={handleChange}
                  required
                  InputLabelProps={{ shrink: true }}
                />
              </Grid2>
              <Grid2 xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Nombre de Inscripción"
                  name="Nombre_Inscripcion"
                  value={formData.Nombre_Inscripcion}
                  onChange={handleChange}
                  required
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
