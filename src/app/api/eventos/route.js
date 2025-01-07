// app/api/eventos/route.js

import pool from '../../../lib/db/connection';
import { NextResponse } from 'next/server';
import { body, param, validationResult } from 'express-validator';
import jwt from 'jsonwebtoken';

// Middleware de validación
const validate = (validations) => async (req, res, next) => {
    await Promise.all(validations.map(validation => validation.run(req)));
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return NextResponse.json({ errors: errors.array() }, { status: 400 });
    }
    next();
};

export async function GET(request) {
    try {
        const [results] = await pool.query(`
            SELECT Evento.*, Sede.Nombre AS SedeNombre
            FROM Evento
            INNER JOIN Sede ON Evento.ID_Sede = Sede.ID_Sede
        `);
        return NextResponse.json(results, { status: 200 });
    } catch (error) {
        console.error("Error obteniendo eventos:", error.message);
        return NextResponse.json({ error: "Error al obtener eventos", details: error.message }, { status: 500 });
    }
}

export async function POST(request) {
    try {
        const data = await request.json();
        const {
            Nombre,
            Fecha_Convocatoria,
            Fecha_Inicio_Inscripciones,
            Fecha_Cierre_Inscripciones,
            Fecha_Inicio,
            Fecha_Fin,
            Modalidad,
            Costo,
            Requisitos,
            Reglas,
            Horarios,
            ID_Sede
        } = data;

        // Validaciones manuales (puedes usar una librería como Joi para más robustez)
        if (!Nombre || !Fecha_Convocatoria || !Fecha_Inicio_Inscripciones || !Fecha_Cierre_Inscripciones ||
            !Fecha_Inicio || !Fecha_Fin || !Modalidad || !Costo || !ID_Sede) {
            return NextResponse.json({ error: "Todos los campos son obligatorios" }, { status: 400 });
        }

        const [result] = await pool.query(`
            INSERT INTO Evento 
            (Nombre, Fecha_Convocatoria, Fecha_Inicio_Inscripciones, Fecha_Cierre_Inscripciones, Fecha_Inicio, Fecha_Fin, Modalidad, Costo, Requisitos, Reglas, Horarios, ID_Sede) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `, [
            Nombre, Fecha_Convocatoria, Fecha_Inicio_Inscripciones, Fecha_Cierre_Inscripciones,
            Fecha_Inicio, Fecha_Fin, Modalidad, Costo, Requisitos, Reglas, Horarios, ID_Sede
        ]);

        return NextResponse.json({ message: "Evento registrado con éxito", id: result.insertId }, { status: 201 });

    } catch (error) {
        console.error("Error registrando evento:", error.message);
        return NextResponse.json({ error: "Error al registrar evento", details: error.message }, { status: 500 });
    }
}
