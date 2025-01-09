import React from "react";
import NextLink from "next/link";
import { AppBar, Container, Toolbar, Typography, Button } from "@mui/material";
import Sidebar from "@/components/Sidebar";

export default function Navegacion({ children }) {
  return (
    <>
      <AppBar position="fixed">
        <Toolbar>
          {/* Muestra el menú lateral mediante el botón dentro de Menu.jsx */}
          <Sidebar />
          {/* Título del AppBar */}
          <Typography
            variant="h6"
            sx={{ flexGrow: 1, textDecoration: "none", color: "inherit" }}
            component={NextLink}
            href={"/"}
          >
            Club de Leones
          </Typography>
          {/* Botón de Iniciar Sesión */}
          <Button
            component={NextLink}
            href="/login"
            color="inherit"
            variant="outlined"
            sx={{ ml: 2 }}
          >
            Iniciar Sesión
          </Button>
        </Toolbar>
      </AppBar>
      <Container sx={{ mt: 10, mb: 4 }}>{children}</Container>
    </>
  );
}
