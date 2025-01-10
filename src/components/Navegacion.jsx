import React, { useContext } from "react";
import NextLink from "next/link";
import { AppBar, Container, Toolbar, Typography, Button } from "@mui/material";
import Sidebar from "@/components/Sidebar";
import { AuthContext } from "@/context/AuthContext";

export default function Navegacion({
  hideSidebar = false,
  hideLogout = false,
  children,
}) {
  const { logout } = useContext(AuthContext);

  return (
    <>
      <AppBar position="fixed">
        <Toolbar>
          {/* Muestra el menú lateral mediante el botón dentro de Menu.jsx */}
          {hideSidebar !== true && <Sidebar />}
          {/* Título del AppBar */}
          <Typography
            variant="h6"
            sx={{ flexGrow: 1, textDecoration: "none", color: "inherit" }}
            component={NextLink}
            href={"/"}
          >
            Club de Leones
          </Typography>
          {/* Botón de Cerrar Sesión */}
          {hideLogout !== true && (
            <Button
              onClick={logout}
              color="inherit"
              variant="outlined"
              sx={{ ml: 2 }}
            >
              Cerrar Sesión
            </Button>
          )}
        </Toolbar>
      </AppBar>
      <Container sx={{ mt: 10, mb: 4 }}>{children}</Container>
    </>
  );
}
