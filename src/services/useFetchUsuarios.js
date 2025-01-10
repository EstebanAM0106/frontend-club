import { useState, useEffect } from "react";
import axios from "@/services/api";

const useFetchUsuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const response = await axios.get("/usuarios");
        setUsuarios(response.data);
        setError(null);
      } catch (err) {
        setError("Error al obtener los usuarios.");
      } finally {
        setLoading(false);
      }
    };

    fetchUsuarios();
  }, []);

  return { usuarios, loading, error };
};

export default useFetchUsuarios;
