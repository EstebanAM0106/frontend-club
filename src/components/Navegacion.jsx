import React from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";
import Sidebar from "@/components/Sidebar";

export default function Navegacion() {
  return (
    <AppBar position="static">
      <Toolbar>
        {/* Muestra el menú lateral mediante el botón dentro de Menu.jsx */}
        <Sidebar />
        {/* Título del AppBar */}
        <Typography
          variant="h6"
          sx={{ flexGrow: 1 }}
        >
          Club de Leones
        </Typography>
      </Toolbar>
    </AppBar>
  );
}
