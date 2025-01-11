import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import axios from "@/services/api";

const BotonEliminarInscripcion = ({ id, fetchInscripciones }) => {
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [error, setError] = useState(null);

  const handleDelete = async () => {
    try {
      await axios.delete(`/inscripciones/${id}`);
      fetchInscripciones();
      alert("Inscripción eliminada con éxito");
    } catch (err) {
      setError("Error al eliminar la inscripción.");
    } finally {
      setDeleteDialog(false);
    }
  };

  return (
    <>
      <Button
        variant="contained"
        color="secondary"
        onClick={() => setDeleteDialog(true)}
      >
        Eliminar
      </Button>
      <Dialog
        open={deleteDialog}
        onClose={() => setDeleteDialog(false)}
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
          <Button onClick={() => setDeleteDialog(false)}>Cancelar</Button>
          <Button onClick={handleDelete} color="secondary">
            Eliminar
          </Button>
        </DialogActions>
      </Dialog>
      {error && <p>{error}</p>}
    </>
  );
};

export default BotonEliminarInscripcion;
