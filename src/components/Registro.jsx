import React, { useState } from "react";
import axios from "../services/api";

const Registro = () => {
    const [evento, setEvento] = useState({
        Nombre: "",
        Fecha_Convocatoria: "",
        Fecha_Inicio_Inscripciones: "",
        Fecha_Cierre_Inscripciones: "",
        Fecha_Inicio: "",
        Fecha_Fin: "",
        Modalidad: "",
        Costo: "",
        Requisitos: "",
        Reglas: "",
        Horarios: "",
        ID_Sede: "",
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        setEvento({
            ...evento,
            [e.target.name]: e.target.value,
        });
    };

    const validate = () => {
        const newErrors = {};
        if (!evento.Nombre) newErrors.Nombre = "El nombre es obligatorio.";
        if (!evento.Fecha_Convocatoria) newErrors.Fecha_Convocatoria = "La fecha de convocatoria es obligatoria.";
        if (!evento.Fecha_Inicio_Inscripciones) newErrors.Fecha_Inicio_Inscripciones = "La fecha de inicio de inscripciones es obligatoria.";
        if (!evento.Fecha_Cierre_Inscripciones) newErrors.Fecha_Cierre_Inscripciones = "La fecha de cierre de inscripciones es obligatoria.";
        if (!evento.Fecha_Inicio) newErrors.Fecha_Inicio = "La fecha de inicio es obligatoria.";
        if (!evento.Fecha_Fin) newErrors.Fecha_Fin = "La fecha de fin es obligatoria.";
        if (!evento.Modalidad) newErrors.Modalidad = "La modalidad es obligatoria.";
        if (!evento.Costo) newErrors.Costo = "El costo es obligatorio.";
        if (!evento.ID_Sede) newErrors.ID_Sede = "El ID de la sede es obligatorio.";
        return newErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        try {
            const response = await axios.post("/eventos", evento);
            alert("Evento registrado con éxito!");
            setEvento({ Nombre: "", Fecha_Convocatoria: "", Fecha_Inicio_Inscripciones: "", Fecha_Cierre_Inscripciones: "", Fecha_Inicio: "", Fecha_Fin: "", Modalidad: "", Costo: "", Requisitos: "", Reglas: "", Horarios: "", ID_Sede: "" }); // Resetear el formulario
            setErrors({});
        } catch (error) {
            console.error("Error registrando el evento:", error);
            alert("Error registrando el evento. Por favor, inténtalo de nuevo.");
        }
    };

    return (
        <form className="form-registro" onSubmit={handleSubmit}>
            <h2>Registrar Evento</h2>
            <label htmlFor="Nombre">Nombre del Evento</label>
            <input
                type="text"
                name="Nombre"
                id="Nombre"
                placeholder="Nombre del evento"
                value={evento.Nombre}
                onChange={handleChange}
                required
            />
            {errors.Nombre && <p className="error">{errors.Nombre}</p>}
            <label htmlFor="Fecha_Convocatoria">Fecha de Convocatoria</label>
            <input
                type="date"
                name="Fecha_Convocatoria"
                id="Fecha_Convocatoria"
                value={evento.Fecha_Convocatoria}
                onChange={handleChange}
                required
            />
            {errors.Fecha_Convocatoria && <p className="error">{errors.Fecha_Convocatoria}</p>}
            <label htmlFor="Fecha_Inicio_Inscripciones">Fecha de Inicio de Inscripciones</label>
            <input
                type="date"
                name="Fecha_Inicio_Inscripciones"
                id="Fecha_Inicio_Inscripciones"
                value={evento.Fecha_Inicio_Inscripciones}
                onChange={handleChange}
                required
            />
            {errors.Fecha_Inicio_Inscripciones && <p className="error">{errors.Fecha_Inicio_Inscripciones}</p>}
            <label htmlFor="Fecha_Cierre_Inscripciones">Fecha de Cierre de Inscripciones</label>
            <input
                type="date"
                name="Fecha_Cierre_Inscripciones"
                id="Fecha_Cierre_Inscripciones"
                value={evento.Fecha_Cierre_Inscripciones}
                onChange={handleChange}
                required
            />
            {errors.Fecha_Cierre_Inscripciones && <p className="error">{errors.Fecha_Cierre_Inscripciones}</p>}
            <label htmlFor="Fecha_Inicio">Fecha de Inicio</label>
            <input
                type="date"
                name="Fecha_Inicio"
                id="Fecha_Inicio"
                value={evento.Fecha_Inicio}
                onChange={handleChange}
                required
            />
            {errors.Fecha_Inicio && <p className="error">{errors.Fecha_Inicio}</p>}
            <label htmlFor="Fecha_Fin">Fecha de Fin</label>
            <input
                type="date"
                name="Fecha_Fin"
                id="Fecha_Fin"
                value={evento.Fecha_Fin}
                onChange={handleChange}
                required
            />
            {errors.Fecha_Fin && <p className="error">{errors.Fecha_Fin}</p>}
            <label htmlFor="Modalidad">Modalidad</label>
            <input
                type="text"
                name="Modalidad"
                id="Modalidad"
                placeholder="Modalidad"
                value={evento.Modalidad}
                onChange={handleChange}
                required
            />
            {errors.Modalidad && <p className="error">{errors.Modalidad}</p>}
            <label htmlFor="Costo">Costo</label>
            <input
                type="number"
                name="Costo"
                id="Costo"
                placeholder="Costo"
                value={evento.Costo}
                onChange={handleChange}
                required
            />
            {errors.Costo && <p className="error">{errors.Costo}</p>}
            <label htmlFor="Requisitos">Requisitos</label>
            <textarea
                name="Requisitos"
                id="Requisitos"
                placeholder="Requisitos"
                value={evento.Requisitos}
                onChange={handleChange}
            ></textarea>
            {errors.Requisitos && <p className="error">{errors.Requisitos}</p>}
            <label htmlFor="Reglas">Reglas</label>
            <textarea
                name="Reglas"
                id="Reglas"
                placeholder="Reglas"
                value={evento.Reglas}
                onChange={handleChange}
            ></textarea>
            {errors.Reglas && <p className="error">{errors.Reglas}</p>}
            <label htmlFor="Horarios">Horarios</label>
            <textarea
                name="Horarios"
                id="Horarios"
                placeholder="Horarios"
                value={evento.Horarios}
                onChange={handleChange}
            ></textarea>
            {errors.Horarios && <p className="error">{errors.Horarios}</p>}
            <label htmlFor="ID_Sede">ID de la Sede</label>
            <input
                type="number"
                name="ID_Sede"
                id="ID_Sede"
                placeholder="ID de la Sede"
                value={evento.ID_Sede}
                onChange={handleChange}
                required
            />
            {errors.ID_Sede && <p className="error">{errors.ID_Sede}</p>}
            <button type="submit">Registrar</button>
        </form>
    );
};

export default Registro;
