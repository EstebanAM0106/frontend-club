import React from "react";
import { TextField, MenuItem, CircularProgress } from "@mui/material";
import useFetchUsuarios from "@/services/useFetchUsuarios";

const SelectUsuario = ({ value, onChange }) => {
  const { usuarios, loading, error } = useFetchUsuarios();

  return (
    <TextField
      select
      label="Seleccionar Usuario"
      value={value}
      onChange={onChange}
      fullWidth
      required
      sx={{ minWidth: 200 }}
      //   margin="normal"
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
            {usuario.Nombre} {usuario.Apellido}
          </MenuItem>
        ))
      )}
    </TextField>
  );
};

export default SelectUsuario;
