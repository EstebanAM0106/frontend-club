import React from "react";
import { TextField, MenuItem, CircularProgress } from "@mui/material";

const SelectUsuarioFiltrado = ({
  value,
  onChange,
  usuarios,
  loading,
  error,
}) => {
  return (
    <TextField
      select
      label="Seleccionar Usuario"
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
        <MenuItem disabled>Error al cargar usuarios</MenuItem>
      ) : (
        usuarios.map((usuario) => (
          <MenuItem key={usuario.ID_Usuario} value={usuario.ID_Usuario}>
            {usuario.Nombre}
          </MenuItem>
        ))
      )}
    </TextField>
  );
};

export default SelectUsuarioFiltrado;
