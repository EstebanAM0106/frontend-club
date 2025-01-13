import { useState, useEffect } from "react";
import axios from "@/services/api";

const useFetchTiempo = () => {
  const [tiempos, setTiempos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTiempos = async () => {
    setLoading(true);
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

  useEffect(() => {
    fetchTiempos();
  }, []);

  return { tiempos, loading, error, setTiempos, fetchTiempos };
};

export default useFetchTiempo;
