import { useState, useEffect } from "react";
import axios from "@/services/api";

const useFetchEventos = () => {
  const [eventos, setEventos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchEventos = async () => {
    try {
      const response = await axios.get("/eventos");
      setEventos(response.data);
      setError(null);
    } catch (err) {
      setError("Error al obtener la lista de eventos.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEventos();
  }, []);

  return { eventos, loading, error, setEventos, fetchEventos };
};

export default useFetchEventos;
