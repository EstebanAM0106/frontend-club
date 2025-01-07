// app/api/actividades/[id]/route.js

import pool from '@/lib/connection';
import { NextResponse } from 'next/server';

export async function DELETE(request, { params }) {
    try {
        const { id } = params;

        const [result] = await pool.query(`
            UPDATE actividades SET is_deleted = TRUE WHERE id = ?
        `, [id]);

        if (result.affectedRows === 0) {
            return NextResponse.json({ error: "Actividad no encontrada" }, { status: 404 });
        }

        return NextResponse.json({ message: "Actividad eliminada con éxito" }, { status: 200 });

    } catch (error) {
        console.error("Error eliminando actividad:", error.message);
        return NextResponse.json({ error: "Error al eliminar la actividad" }, { status: 500 });
    }
}
