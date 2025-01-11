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

const TablaInscripciones = () => {
  const { inscripciones, loading, error, setInscripciones } =
    useFetchInscripciones();

  if (loading) return <Typography>Cargando...</Typography>;
  if (error)
    return <Typography>Error al obtener las inscripciones.</Typography>;

  // Agrupar inscripciones por evento
  const inscripcionesPorEvento = inscripciones.reduce((acc, inscripcion) => {
    const { ID_Evento, EventoNombre, UsuarioEmail, ID_Inscripcion } =
      inscripcion;
    if (!acc[ID_Evento]) {
      acc[ID_Evento] = { EventoNombre, usuarios: [] };
    }
    acc[ID_Evento].usuarios.push({ UsuarioEmail, ID_Inscripcion });
    return acc;
  }, {});

  const fetchInscripciones = async () => {
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
                  <TableCell>Usuario</TableCell>
                  <TableCell align="right">Acciones</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {inscripcionesPorEvento[ID_Evento].usuarios.map(
                  (usuario, index) => (
                    <TableRow key={index}>
                      <TableCell component="th" scope="row">
                        {usuario.UsuarioEmail}
                      </TableCell>
                      <TableCell align="right">
                        <BotonEliminarInscripcion
                          id={usuario.ID_Inscripcion}
                          fetchInscripciones={fetchInscripciones}
                        />
                      </TableCell>
                    </TableRow>
                  )
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      ))}
    </Box>
  );
};

export default TablaInscripciones;
