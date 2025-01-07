// app/api/auth/login/route.js

import pool from '../../../../lib/db/connection';
import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

export async function POST(request) {
    try {
        const data = await request.json();
        const { email, password } = data;

        // Validaciones manuales
        if (!email || !password) {
            return NextResponse.json({ error: "El email y la contraseña son obligatorios" }, { status: 400 });
        }

        const [results] = await pool.query(`
            SELECT * FROM usuarios WHERE email = ? AND password = ?
        `, [email, password]);

        if (results.length === 0) {
            return NextResponse.json({ error: "Credenciales incorrectas" }, { status: 401 });
        }

        const user = results[0];
        const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });

        return NextResponse.json({ token }, { status: 200 });

    } catch (error) {
        console.error("Error en la autenticación:", error.message);
        return NextResponse.json({ error: "Error en la autenticación" }, { status: 500 });
    }
}
