import { useState, useEffect } from "react";
import axios from "@/services/api";

const useFetchTiempo = () => {
  const [tiempos, setTiempos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTiempos = async () => {
      try {
        const response = await axios.get("/registrotiempo");
        setTiempos(response.data);
        setError(null);
      } catch (err) {
        setError("Error al obtener los registros de tiempo.");
      } finally {
        setLoading(false);
      }
    };

    fetchTiempos();
  }, []);

  return { tiempos, loading, error };
};

export default useFetchTiempo;
