import { useState, useEffect } from "react";
import axios from "@/services/api";

const useFetchSedes = () => {
  const [sedes, setSedes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSedes = async () => {
      try {
        const response = await axios.get("/sedes");
        setSedes(response.data);
        setError(null);
      } catch (err) {
        setError("Error al obtener las sedes.");
      } finally {
        setLoading(false);
      }
    };

    fetchSedes();
  }, []);

  return { sedes, loading, error };
};

export default useFetchSedes;
