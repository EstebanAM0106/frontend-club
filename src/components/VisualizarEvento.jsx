import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
  Box,
} from "@mui/material";
import BotonEditarActividad from "@/components/BotonEditarActividad";

const VisualizarEvento = ({ evento, fetchEventos }) => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "2-digit", day: "2-digit" };
    return new Date(dateString).toLocaleDateString("es-ES", options);
  };

  return (
    <>
      <Button variant="contained" color="success" onClick={handleClickOpen}>
        Ver Evento
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Detalles del Evento</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Aquí puedes ver toda la información del evento.
          </DialogContentText>
          <Box sx={{ mt: 2 }}>
            <Typography variant="h6">{evento.Nombre}</Typography>
            <Typography>
              <strong>Convocatoria:</strong>{" "}
              {formatDate(evento.Fecha_Convocatoria)}
            </Typography>
            <Typography>
              <strong>Inicio de Inscripciones:</strong>{" "}
              {formatDate(evento.Fecha_Inicio_Inscripciones)}
            </Typography>
            <Typography>
              <strong>Cierre de Inscripciones:</strong>{" "}
              {formatDate(evento.Fecha_Cierre_Inscripciones)}
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
              <strong>Costo:</strong> {evento.Costo}
            </Typography>
            <Typography>
              <strong>Requisitos:</strong> {evento.Requisitos}
            </Typography>
            <Typography>
              <strong>Reglas:</strong> {evento.Reglas}
            </Typography>
            <Typography>
              <strong>Horarios:</strong> {evento.Horarios}
            </Typography>
            <Typography>
              <strong>Sede:</strong> {evento.SedeNombre}
            </Typography>
          </Box>
          <Box sx={{ mt: 2 }}>
            <BotonEditarActividad evento={evento} fetchEventos={fetchEventos} />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cerrar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default VisualizarEvento;
