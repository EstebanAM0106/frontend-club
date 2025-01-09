import React from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";

export default function LoginNavegacion() {
  return (
    <AppBar position="fixed">
      <Toolbar>
        <Typography
          variant="h6"
          sx={{ flexGrow: 1, textDecoration: "none", color: "inherit" }}
        >
          Club de Leones
        </Typography>
      </Toolbar>
    </AppBar>
  );
}
