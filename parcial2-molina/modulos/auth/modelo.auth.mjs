// modulos/auth/modelo.auth.mjs
import pool from '../../datos/conexion.bd.mjs'

const AuthModel = {
    
    buscarUsuario: async (username) => {
        try {

            const query = 'SELECT * FROM usuarios WHERE username = $1'
            const { rows } = await pool.query(query, [username])
            return rows[0] || null

        } catch (error) {
            console.error("❌ Error en AuthModel (buscarUsuario):", error.message)
            throw error
        }
    },

    guardarSesion: async (usuarioId, token) => {
        try {
            const query = 'INSERT INTO sesiones (usuario_id, token) VALUES ($1, $2) RETURNING id';
            const { rows } = await pool.query(query, [usuarioId, token]);
            return rows[0].id; // Nos devuelve el ID autogenerado de la sesión
        } catch (error) {
            console.error("❌ Error en AuthModel (guardarSesion):", error.message);
            throw error;
        }
    },

    buscarSesionActiva: async (token) => {
        try {
            const query = 'SELECT * FROM sesiones WHERE token = $1';
            const { rows } = await pool.query(query, [token]);
            return rows[0] || null;
        } catch (error) {
            console.error("❌ Error en AuthModel (buscarSesionActiva):", error.message);
            throw error;
        }
    },

    borrarSesion: async (token) => {
        const query = 'DELETE FROM sesiones WHERE token = $1'
        await pool.query(query, [token])
    }
}

export default AuthModel;