import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:5000/api", // Cambia según el entorno
});

// Manejar errores globalmente
api.interceptors.response.use(
    (response) => response,
    (error) => {
        console.error("Error en la API:", error);
        return Promise.reject(error);
    }
);

export default api;
