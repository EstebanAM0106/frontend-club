import { useState, useEffect } from "react";
import axios from "@/services/api";

const useFetchInscripciones = () => {
  const [inscripciones, setInscripciones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Definir la función fetchInscripciones
  const fetchInscripciones = async () => {
    setLoading(true);
    try {
      const response = await axios.get("/inscripciones");
      setInscripciones(response.data);
      setError(null);
    } catch (err) {
      setError("Error al obtener las inscripciones.");
    } finally {
      setLoading(false);
    }
  };

  // Ejecutar fetchInscripciones al montar el componente
  useEffect(() => {
    fetchInscripciones();
  }, []);

  return {
    inscripciones,
    loading,
    error,
    setInscripciones,
    fetchInscripciones,
  };
};

export default useFetchInscripciones;
