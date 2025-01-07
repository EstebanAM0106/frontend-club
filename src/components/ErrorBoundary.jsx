"use client";

import React from "react";
import { Alert, AlertTitle } from "@mui/material";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    // Actualiza el estado para mostrar la UI de fallback
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // Puedes registrar el error en un servicio de reporte de errores
    console.error("Un error ocurrió:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <Alert severity="error">
          <AlertTitle>Error</AlertTitle>
          Algo salió mal — <strong>{this.state.error?.message}</strong>
        </Alert>
      );
    }

    return this.props.children; 
  }
}

export default ErrorBoundary;