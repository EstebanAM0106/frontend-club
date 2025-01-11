import { useState, useEffect } from "react";
import axios from "@/services/api";

const useFetchInscripciones = () => {
  const [inscripciones, setInscripciones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchInscripciones = async () => {
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

    fetchInscripciones();
  }, []);

  return { inscripciones, loading, error, setInscripciones };
};

export default useFetchInscripciones;
