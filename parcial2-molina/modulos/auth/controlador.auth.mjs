// modulos/auth/controlador.auth.mjs
import jwt from 'jsonwebtoken'
import authModelo from './modelo.auth.mjs'
import env from 'dotenv'

export const login = async (req, res) => {
    try {
        const { usuario, pass } = req.body
        const usuarioEncontrado = await authModelo.buscarUsuario(usuario)

        if (!usuarioEncontrado || usuarioEncontrado.password_hash !== pass) {
            return res.status(401).json({ error: "Credenciales no válidas" })
        }

        const token = jwt.sign(
            { id: usuarioEncontrado.id, usuario: usuarioEncontrado.username },
            process.env.FIRMA_JWT, 
            { expiresIn: '1h' }
        )

        // Guardamos la sesión
        await authModelo.guardarSesion(usuarioEncontrado.id, token)

        // Inyectamos la cookie firmada
        res.cookie('token_parcial', token, {
            httpOnly: true, 
            secure: false,  
            signed: true,   
            maxAge: 3600000 
        })

        // Todo OK, redirigimos
        return res.status(200).json({ mensaje: "Autenticación exitosa", redirect: "/admin" })
         
    } catch (error) {
        console.error("Error en el login: ", error)
        return res.status(500).json({ error: "Error interno" })
    }
}

export const salir = async (req, res) => {
    try {
        const token = req.signedCookies?.token_parcial
        if (token) {
            await authModelo.borrarSesion(token)
        }
        res.clearCookie('token_parcial')
        return res.status(200).json({ redirect: "/login" }) 
    } catch (error) {
        return res.status(500).json({ error: "Error al cerrar sesión" })
    }
}