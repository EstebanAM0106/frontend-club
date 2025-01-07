// app/api/eventos/[id]/route.js

import pool from '../../../../lib/db/connection';
import { NextResponse } from 'next/server';

export async function PUT(request, { params }) {
    try {
        const { id } = params;
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

        // Validaciones manuales
        if (!Nombre || !Fecha_Convocatoria || !Fecha_Inicio_Inscripciones || !Fecha_Cierre_Inscripciones ||
            !Fecha_Inicio || !Fecha_Fin || !Modalidad || !Costo || !ID_Sede) {
            return NextResponse.json({ error: "Todos los campos son obligatorios" }, { status: 400 });
        }

        const [result] = await pool.query(`
            UPDATE Evento SET 
                Nombre = ?, 
                Fecha_Convocatoria = ?, 
                Fecha_Inicio_Inscripciones = ?, 
                Fecha_Cierre_Inscripciones = ?, 
                Fecha_Inicio = ?, 
                Fecha_Fin = ?, 
                Modalidad = ?, 
                Costo = ?, 
                Requisitos = ?, 
                Reglas = ?, 
                Horarios = ?, 
                ID_Sede = ? 
            WHERE ID_Evento = ?
        `, [
            Nombre, Fecha_Convocatoria, Fecha_Inicio_Inscripciones, Fecha_Cierre_Inscripciones,
            Fecha_Inicio, Fecha_Fin, Modalidad, Costo, Requisitos, Reglas, Horarios, ID_Sede, id
        ]);

        if (result.affectedRows === 0) {
            return NextResponse.json({ error: "Evento no encontrado" }, { status: 404 });
        }

        return NextResponse.json({ message: "Evento actualizado con éxito" }, { status: 200 });

    } catch (error) {
        console.error("Error actualizando evento:", error.message);
        return NextResponse.json({ error: "Error al actualizar evento", details: error.message }, { status: 500 });
    }
}

export async function DELETE(request, { params }) {
    try {
        const { id } = params;

        const [result] = await pool.query(`
            DELETE FROM Evento WHERE ID_Evento = ?
        `, [id]);

        if (result.affectedRows === 0) {
            return NextResponse.json({ error: "Evento no encontrado" }, { status: 404 });
        }

        return NextResponse.json({ message: "Evento eliminado con éxito" }, { status: 200 });

    } catch (error) {
        console.error("Error eliminando evento:", error.message);
        return NextResponse.json({ error: "Error al eliminar el evento", details: error.message }, { status: 500 });
    }
}
