/**
 * El componente SelectUsuarioFiltrado renderiza un menú desplegable para seleccionar un usuario.
 *
 * @param {Object} props - Las propiedades del componente.
 * @param {string} props.value - El valor seleccionado actualmente.
 * @param {function} props.onChange - La función a llamar cuando cambia la selección.
 * @param {Array} props.usuarios - La lista de usuarios para mostrar en el menú desplegable.
 * @param {boolean} props.loading - Indica si los datos de los usuarios se están cargando actualmente.
 * @param {boolean} props.error - Indica si hubo un error al cargar los datos de los usuarios.
 *
 * @returns {JSX.Element} El componente SelectUsuarioFiltrado renderizado.
 */
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
