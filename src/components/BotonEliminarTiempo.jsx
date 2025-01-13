import React from "react";
import axios from "@/services/api";
import { Button } from "@mui/material";

const BotonEliminarTiempo = ({ id, fetchTiempos }) => {
  const handleDelete = async () => {
    try {
      await axios.delete(`/registroTiempo/${id}`);
      fetchTiempos();
    } catch (error) {
      console.error("Error al eliminar el registro de tiempo:", error);
    }
  };

  return (
    <Button variant="contained" color="error" onClick={handleDelete}>
      Eliminar
    </Button>
  );
};

export default BotonEliminarTiempo;
