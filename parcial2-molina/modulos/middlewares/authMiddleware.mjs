// modulos/middlewares/authMiddleware.mjs
import jwt from 'jsonwebtoken'
import AuthModel from '../auth/modelo.auth.mjs' 
import 'dotenv/config'

export const protegerRuta = async (req, res, next) => {
    try {
        const token = req.signedCookies?.token_parcial

        if (!token) {
            if (req.accepts('html')) return res.redirect('/login')
            return res.status(401).json({ error: "Acceso denegado. No se encontró un token activo." })
        }

        const usuarioVerificado = jwt.verify(token, process.env.FIRMA_JWT)
        const sesionEnBaseDatos = await AuthModel.buscarSesionActiva(token)

        if (!sesionEnBaseDatos) {
            res.clearCookie('token_parcial')
            if (req.accepts('html')) return res.redirect('/login')
            return res.status(401).json({ error: "Sesión inválida o expirada en la base de datos." })
        }

        req.usuario = usuarioVerificado
        next()

    } catch (error) {
        console.error("❌ Error de validación en el Middleware:", error.message)
        res.clearCookie('token_parcial')
        
        if (req.accepts('html')) return res.redirect('/login')
        return res.status(403).json({ error: "Token inválido, alterado o expirado." })
    }
}