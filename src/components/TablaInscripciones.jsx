import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box,
} from "@mui/material";
import useFetchInscripciones from "@/services/useFetchInscripciones";
import BotonEliminarInscripcion from "@/components/BotonEliminarInscripcion";
import axios from "@/services/api"; // Asegurarse de importar axios

const TablaInscripciones = ({ onDelete }) => {
  // Aceptar onDelete como prop
  const {
    inscripciones,
    loading,
    error,
    setInscripciones,
    fetchInscripciones,
  } = useFetchInscripciones();

  if (loading) return <Typography>Cargando...</Typography>;
  if (error)
    return <Typography>Error al obtener las inscripciones.</Typography>;

  // Agrupar inscripciones por evento
  const inscripcionesPorEvento = inscripciones.reduce((acc, inscripcion) => {
    const {
      ID_Evento,
      EventoNombre,
      UsuarioNombre,
      UsuarioApellido,
      ID_Inscripcion,
    } = inscripcion;
    if (!acc[ID_Evento]) {
      acc[ID_Evento] = { EventoNombre, usuarios: [] };
    }
    acc[ID_Evento].usuarios.push({
      UsuarioNombre,
      UsuarioApellido,
      ID_Inscripcion,
    });
    return acc;
  }, {});

  const fetchInscripcionesInternal = async () => {
    // Renombrar para evitar confusión
    try {
      const response = await axios.get("/inscripciones");
      setInscripciones(response.data);
    } catch (err) {
      console.error("Error al obtener las inscripciones:", err);
    }
  };

  return (
    <Box>
      {Object.keys(inscripcionesPorEvento).map((ID_Evento) => (
        <Box key={ID_Evento} sx={{ mb: 4 }}>
          <Typography variant="h6" gutterBottom>
            Inscritos a: {inscripcionesPorEvento[ID_Evento].EventoNombre}
          </Typography>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="tabla de inscripciones">
              <TableHead>
                <TableRow>
                  <TableCell>Nombre</TableCell>
                  <TableCell>Apellido</TableCell>
                  <TableCell align="right">Acciones</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {inscripcionesPorEvento[ID_Evento].usuarios.map((usuario) => (
                  <TableRow key={usuario.ID_Inscripcion}>
                    <TableCell component="th" scope="row">
                      {usuario.UsuarioNombre}
                    </TableCell>
                    <TableCell>{usuario.UsuarioApellido}</TableCell>
                    <TableCell align="right">
                      <BotonEliminarInscripcion
                        id={usuario.ID_Inscripcion}
                        fetchInscripciones={fetchInscripcionesInternal} // Usar fetchInscripcionesInternal
                        onDelete={onDelete} // Opcional si se usa en BotonEliminarInscripcion
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      ))}
    </Box>
  );
};

export default TablaInscripciones;
