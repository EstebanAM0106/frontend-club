import React from "react";
import { TextField, MenuItem, CircularProgress } from "@mui/material";
import useFetchEventos from "@/services/useFetchEventos";

const SelectEvento = ({ value, onChange }) => {
  const { eventos, loading, error } = useFetchEventos();

  return (
    <TextField
      select
      label="Seleccionar Evento"
      value={value}
      onChange={onChange}
      fullWidth
      required
      sx={{ minWidth: 200 }}
    >
      {loading ? (
        <MenuItem disabled>
          <CircularProgress size={24} />
        </MenuItem>
      ) : error ? (
        <MenuItem disabled>Error al cargar eventos</MenuItem>
      ) : (
        eventos.map((evento) => (
          <MenuItem key={evento.ID_Evento} value={evento.ID_Evento}>
            {evento.Nombre}
          </MenuItem>
        ))
      )}
    </TextField>
  );
};

export default SelectEvento;
