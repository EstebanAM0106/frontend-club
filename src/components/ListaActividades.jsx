"use client";

import React, { useEffect, useState } from "react";
import axios from "@/services/api";
import Menu from "@/components/Menu"; // Importar el componente de menú
import { useRouter } from "next/navigation";

const ListaActividades = () => {
  const [eventos, setEventos] = useState([]);
  const [editEvento, setEditEvento] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchEventos = async () => {
      try {
        const response = await axios.get("/eventos");
        setEventos(response.data);
      } catch (error) {
        console.error("Error obteniendo eventos:", error);
      }
    };

    fetchEventos();
  }, []);

  const eliminarEvento = async (id) => {
    try {
      await axios.delete(`/eventos/${id}`);
      setEventos(eventos.filter((evento) => evento.ID_Evento !== id));
      alert("Evento eliminado con éxito");
    } catch (error) {
      console.error("Error eliminando evento:", error);
    }
  };

  const editarEvento = (evento) => {
    setEditEvento(evento);
  };

  const handleEditChange = (e) => {
    setEditEvento({
      ...editEvento,
      [e.target.name]: e.target.value,
    });
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/eventos/${editEvento.ID_Evento}`, editEvento);
      setEventos(
        eventos.map((evento) =>
          evento.ID_Evento === editEvento.ID_Evento ? editEvento : evento
        )
      );
      setEditEvento(null);
      alert("Evento actualizado con éxito");
    } catch (error) {
      console.error("Error actualizando evento:", error);
    }
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "2-digit", day: "2-digit" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="lista-eventos">
      <Menu /> {/* Agregar el componente de menú */}
      <h2>Lista de Eventos</h2>
      <ul>
        {eventos.length > 0 ? (
          eventos.map((evento) => (
            <li key={evento.ID_Evento}>
              <h3>{evento.Nombre}</h3>
              <p>
                Fecha de Convocatoria: {formatDate(evento.Fecha_Convocatoria)}
              </p>
              <p>Fecha de Inicio: {formatDate(evento.Fecha_Inicio)}</p>
              <p>Fecha de Fin: {formatDate(evento.Fecha_Fin)}</p>
              <p>Modalidad: {evento.Modalidad}</p>
              <p>Costo: {evento.Costo}</p>
              <p>Sede: {evento.SedeNombre}</p>
              <button onClick={() => eliminarEvento(evento.ID_Evento)}>
                Eliminar
              </button>
              <button onClick={() => editarEvento(evento)}>Editar</button>
            </li>
          ))
        ) : (
          <p>No hay eventos registrados.</p>
        )}
      </ul>
      {editEvento && (
        <form className="form-registro" onSubmit={handleEditSubmit}>
          <h2>Editar Evento</h2>
          <input
            type="text"
            name="Nombre"
            placeholder="Nombre del evento"
            value={editEvento.Nombre}
            onChange={handleEditChange}
            required
          />
          <input
            type="date"
            name="Fecha_Convocatoria"
            value={editEvento.Fecha_Convocatoria}
            onChange={handleEditChange}
            required
          />
          <input
            type="date"
            name="Fecha_Inicio_Inscripciones"
            value={editEvento.Fecha_Inicio_Inscripciones}
            onChange={handleEditChange}
            required
          />
          <input
            type="date"
            name="Fecha_Cierre_Inscripciones"
            value={editEvento.Fecha_Cierre_Inscripciones}
            onChange={handleEditChange}
            required
          />
          <input
            type="date"
            name="Fecha_Inicio"
            value={editEvento.Fecha_Inicio}
            onChange={handleEditChange}
            required
          />
          <input
            type="date"
            name="Fecha_Fin"
            value={editEvento.Fecha_Fin}
            onChange={handleEditChange}
            required
          />
          <input
            type="text"
            name="Modalidad"
            placeholder="Modalidad"
            value={editEvento.Modalidad}
            onChange={handleEditChange}
            required
          />
          <input
            type="number"
            name="Costo"
            placeholder="Costo"
            value={editEvento.Costo}
            onChange={handleEditChange}
            required
          />
          <textarea
            name="Requisitos"
            placeholder="Requisitos"
            value={editEvento.Requisitos}
            onChange={handleEditChange}
          ></textarea>
          <textarea
            name="Reglas"
            placeholder="Reglas"
            value={editEvento.Reglas}
            onChange={handleEditChange}
          ></textarea>
          <textarea
            name="Horarios"
            placeholder="Horarios"
            value={editEvento.Horarios}
            onChange={handleEditChange}
          ></textarea>
          <input
            type="number"
            name="ID_Sede"
            placeholder="ID de la Sede"
            value={editEvento.ID_Sede}
            onChange={handleEditChange}
            required
          />
          <button type="submit">Actualizar</button>
          <button type="button" onClick={() => setEditEvento(null)}>
            Cancelar
          </button>
        </form>
      )}
    </div>
  );
};

export default ListaActividades;
