"use client";

import React, { useContext, useState } from "react";
import axios from "@/services/api";
import {
  Box,
  Button,
  Container,
  Grid2,
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
import TablaInscripciones from "@/components/TablaInscripciones";

// Componente principal
const Inscripcion = () => {
  const { user } = useContext(AuthContext);
  const {
    inscripciones,
    loading,
    error,
    setInscripciones,
    fetchInscripciones,
  } = useFetchInscripciones(); // Desestructurar fetchInscripciones desde el hook
  const [deleteDialog, setDeleteDialog] = useState({ open: false, id: null });
  const [formData, setFormData] = useState({
    ID_Evento: "",
    ID_Usuario: "",
  });
  const [formError, setFormError] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError(null); // Limpiar error antes de registrar
    try {
      const response = await axios.post("/inscripciones", formData);
      if (response.status === 201 || response.status === 200) {
        setFormData({
          ID_Evento: "",
          ID_Usuario: "",
        });
        fetchInscripciones(); // Asegura que los datos se actualicen
        alert("Inscripción registrada con éxito");
      } else {
        throw new Error("Error inesperado al registrar la inscripción.");
      }
    } catch (err) {
      setFormError(
        err.response?.data?.errors
          ? err.response.data.errors.map((error) => error.msg).join(", ")
          : "Error al registrar la inscripción."
      );
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
      setFormError("Error al eliminar la inscripción.");
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
          {formError && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {formError}
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
          <TablaInscripciones onDelete={handleDelete} />{" "}
          {/* Pasar handleDelete */}
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
