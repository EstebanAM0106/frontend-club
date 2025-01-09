import React from "react";
import LoginNavegacion from "@/app/login/LoginNavegacion";
import Container from "@mui/material/Container";

export default function LoginLayout({ children }) {
  return (
    <>
      <LoginNavegacion />
      <Container sx={{ mt: 10, mb: 4 }}>{children}</Container>
    </>
  );
}
