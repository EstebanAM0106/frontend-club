import React from "react";
import { Button, Typography, Paper, Box } from "@mui/material";
import VisualizarEvento from "@/components/VisualizarEvento";

const EventCard = ({ evento, onDelete, fetchEventos }) => {
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "2-digit", day: "2-digit" };
    return new Date(dateString).toLocaleDateString("es-ES", options);
  };

  return (
    <Paper elevation={3} sx={{ padding: 2, marginBottom: 2 }}>
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
      <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
        <VisualizarEvento evento={evento} fetchEventos={fetchEventos} />
        <Button
          variant="contained"
          color="secondary"
          onClick={() => onDelete(evento.ID_Evento)}
        >
          Eliminar
        </Button>
      </Box>
    </Paper>
  );
};

export default EventCard;
