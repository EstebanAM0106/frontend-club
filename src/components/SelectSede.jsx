import React from "react";
import { TextField, MenuItem, CircularProgress } from "@mui/material";
import useFetchSedes from "@/services/useFetchSedes";

const SelectSede = ({ value, onChange }) => {
  const { sedes, loading, error } = useFetchSedes();

  return (
    <TextField
      select
      label="Seleccionar Sede"
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
        <MenuItem disabled>Error al cargar sedes</MenuItem>
      ) : (
        sedes.map((sede) => (
          <MenuItem key={sede.ID_Sede} value={sede.ID_Sede}>
            {sede.Nombre}
          </MenuItem>
        ))
      )}
    </TextField>
  );
};

export default SelectSede;
