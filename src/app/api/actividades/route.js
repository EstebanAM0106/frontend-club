// app/api/actividades/route.js

import pool from '../../../lib/db/connection';
import { NextResponse } from 'next/server';

export async function GET(request) {
    try {
        const [results] = await pool.query(`
            SELECT actividades.*, usuarios.nombre AS usuario
            FROM actividades
            INNER JOIN usuarios ON actividades.usuario_id = usuarios.id
            WHERE actividades.is_deleted = FALSE
        `);
        return NextResponse.json(results, { status: 200 });
    } catch (error) {
        console.error("Error obteniendo actividades:", error.message);
        return NextResponse.json({ error: "Error al obtener actividades" }, { status: 500 });
    }
}

export async function POST(request) {
    try {
        const data = await request.json();
        const { nombre, descripcion, fecha, usuario_id } = data;

        // Validaciones manuales
        if (!nombre || !descripcion || !fecha || !usuario_id) {
            return NextResponse.json({ error: "Todos los campos son obligatorios" }, { status: 400 });
        }

        const [result] = await pool.query(`
            INSERT INTO actividades (nombre, descripcion, fecha, usuario_id) 
            VALUES (?, ?, ?, ?)
        `, [nombre, descripcion, fecha, usuario_id]);

        return NextResponse.json({ message: "Actividad registrada con éxito", id: result.insertId }, { status: 201 });

    } catch (error) {
        console.error("Error registrando actividad:", error.message);
        return NextResponse.json({ error: "Error al registrar actividad" }, { status: 500 });
    }
}
