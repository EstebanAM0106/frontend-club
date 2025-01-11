import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@mui/material";
import axios from "@/services/api";
import SelectSede from "@/components/SelectSede"; // Importar el componente SelectSede

const BotonEditarActividad = ({ evento, fetchEventos }) => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    Nombre: evento.Nombre,
    Fecha_Convocatoria: evento.Fecha_Convocatoria,
    Fecha_Inicio_Inscripciones: evento.Fecha_Inicio_Inscripciones,
    Fecha_Cierre_Inscripciones: evento.Fecha_Cierre_Inscripciones,
    Fecha_Inicio: evento.Fecha_Inicio,
    Fecha_Fin: evento.Fecha_Fin,
    Modalidad: evento.Modalidad,
    Costo: evento.Costo,
    Requisitos: evento.Requisitos,
    Reglas: evento.Reglas,
    Horarios: evento.Horarios,
    ID_Sede: evento.ID_Sede,
  });
  const [error, setError] = useState(null);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setError(null);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/eventos/${evento.ID_Evento}`, formData);
      fetchEventos();
      handleClose();
    } catch (err) {
      setError(
        err.response?.data?.error || "Error al actualizar la actividad."
      );
    }
  };

  return (
    <>
      <Button variant="contained" color="primary" onClick={handleClickOpen}>
        Editar
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Editar Actividad</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Modifica la información de la actividad y guarda los cambios.
          </DialogContentText>
          {error && <p style={{ color: "red" }}>{error}</p>}
          <form onSubmit={handleSubmit}>
            <TextField
              margin="dense"
              label="Nombre"
              type="text"
              fullWidth
              name="Nombre"
              value={formData.Nombre}
              onChange={handleChange}
            />
            <TextField
              margin="dense"
              label="Fecha de Convocatoria"
              type="date"
              fullWidth
              name="Fecha_Convocatoria"
              value={formData.Fecha_Convocatoria}
              onChange={handleChange}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              margin="dense"
              label="Fecha de Inicio de Inscripciones"
              type="date"
              fullWidth
              name="Fecha_Inicio_Inscripciones"
              value={formData.Fecha_Inicio_Inscripciones}
              onChange={handleChange}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              margin="dense"
              label="Fecha de Cierre de Inscripciones"
              type="date"
              fullWidth
              name="Fecha_Cierre_Inscripciones"
              value={formData.Fecha_Cierre_Inscripciones}
              onChange={handleChange}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              margin="dense"
              label="Fecha de Inicio"
              type="date"
              fullWidth
              name="Fecha_Inicio"
              value={formData.Fecha_Inicio}
              onChange={handleChange}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              margin="dense"
              label="Fecha de Fin"
              type="date"
              fullWidth
              name="Fecha_Fin"
              value={formData.Fecha_Fin}
              onChange={handleChange}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              margin="dense"
              label="Modalidad"
              type="text"
              fullWidth
              name="Modalidad"
              value={formData.Modalidad}
              onChange={handleChange}
            />
            <TextField
              margin="dense"
              label="Costo"
              type="number"
              fullWidth
              name="Costo"
              value={formData.Costo}
              onChange={handleChange}
            />
            <TextField
              margin="dense"
              label="Requisitos"
              type="text"
              fullWidth
              name="Requisitos"
              value={formData.Requisitos}
              onChange={handleChange}
              multiline
              rows={4}
            />
            <TextField
              margin="dense"
              label="Reglas"
              type="text"
              fullWidth
              name="Reglas"
              value={formData.Reglas}
              onChange={handleChange}
              multiline
              rows={4}
            />
            <TextField
              margin="dense"
              label="Horarios"
              type="text"
              fullWidth
              name="Horarios"
              value={formData.Horarios}
              onChange={handleChange}
              multiline
              rows={4}
            />
            <SelectSede
              value={formData.ID_Sede}
              onChange={(e) =>
                setFormData({ ...formData, ID_Sede: e.target.value })
              }
            />
            <DialogActions>
              <Button onClick={handleClose} color="secondary">
                Cancelar
              </Button>
              <Button type="submit" color="primary">
                Guardar
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default BotonEditarActividad;
