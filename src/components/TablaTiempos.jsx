"use client";

import React from "react";
import useFetchTiempo from "@/services/useFetchTiempo";
import useFetchEventos from "@/services/useFetchEventos";
import useFetchUsuarios from "@/services/useFetchUsuarios";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Typography,
  Box,
  Divider,
} from "@mui/material";
import BotonEliminarTiempo from "./BotonEliminarTiempo";

const TablaTiempos = () => {
  const {
    tiempos,
    loading: loadingTiempos,
    error: errorTiempos,
    fetchTiempos,
  } = useFetchTiempo();
  const {
    eventos,
    loading: loadingEventos,
    error: errorEventos,
  } = useFetchEventos();
  const {
    usuarios,
    loading: loadingUsuarios,
    error: errorUsuarios,
  } = useFetchUsuarios();

  console.log("tiempos:", tiempos);
  console.log("eventos:", eventos);
  console.log("usuarios:", usuarios);
  //   console.log("loadingTiempos:", loadingTiempos);
  //   console.log("loadingEventos:", loadingEventos);
  //   console.log("loadingUsuarios:", loadingUsuarios);
  //   console.log("errorTiempos:", errorTiempos);
  //   console.log("errorEventos:", errorEventos);
  //   console.log("errorUsuarios:", errorUsuarios);

  const loading = loadingTiempos || loadingEventos || loadingUsuarios;
  const error = errorTiempos || errorEventos || errorUsuarios;

  if (loading)
    return (
      <div
        style={{ display: "flex", justifyContent: "center", padding: "20px" }}
      >
        <CircularProgress />
      </div>
    );
  if (error)
    return (
      <Typography color="error" variant="h6" align="center">
        {error}
      </Typography>
    );

  return (
    <Box>
      {eventos.map((evento) => {
        const tiemposEvento = tiempos.filter(
          (tiempo) => tiempo.ID_Evento === evento.ID_Evento
        );

        // Convert 'Tiempo' to total seconds and sort ascendingly
        const sortedTiemposEvento = [...tiemposEvento].sort((a, b) => {
          const timeA = a.Tiempo.split(":").map(Number);
          const timeB = b.Tiempo.split(":").map(Number);
          const totalA = timeA[0] * 3600 + timeA[1] * 60 + timeA[2];
          const totalB = timeB[0] * 3600 + timeB[1] * 60 + timeB[2];
          return totalA - totalB;
        });

        return (
          <Box key={evento.ID_Evento} mb={4}>
            <Typography variant="h6" gutterBottom>
              {evento.Nombre}
            </Typography>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Posición</TableCell>
                    <TableCell>Usuario</TableCell>
                    <TableCell>Tiempo</TableCell>
                    <TableCell>Acciones</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {sortedTiemposEvento.length > 0 ? (
                    sortedTiemposEvento.map((tiempo, index) => {
                      const usuario = usuarios.find(
                        (u) => u.ID_Usuario === tiempo.ID_Usuario
                      );

                      // Determine the color based on position
                      let positionColor;
                      if (index === 0) {
                        positionColor = "#FFD700"; // Gold
                      } else if (index === 1) {
                        positionColor = "#C0C0C0"; // Silver
                      } else if (index === 2) {
                        positionColor = "#CD7F32"; // Bronze
                      } else {
                        positionColor = "inherit"; // Default
                      }

                      return (
                        <TableRow key={tiempo.ID_Registro}>
                          <TableCell
                            sx={{
                              color: positionColor,
                              fontWeight: index < 3 ? "bold" : "normal",
                            }}
                          >
                            {index + 1}
                          </TableCell>
                          <TableCell>
                            {usuario
                              ? `${usuario.Nombre} ${usuario.Apellido}`
                              : "N/A"}
                          </TableCell>
                          <TableCell>{tiempo.Tiempo}</TableCell>
                          <TableCell>
                            <BotonEliminarTiempo
                              id={tiempo.ID_Registro}
                              fetchTiempos={fetchTiempos}
                            />
                          </TableCell>
                        </TableRow>
                      );
                    })
                  ) : (
                    <TableRow>
                      <TableCell colSpan={4} align="center">
                        No hay registros de tiempo para este evento.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
            <Divider style={{ marginTop: "20px" }} />
          </Box>
        );
      })}
    </Box>
  );
};

export default TablaTiempos;
