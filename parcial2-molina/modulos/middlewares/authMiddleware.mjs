// modulos/middlewares/authMiddleware.mjs
import jwt from 'jsonwebtoken'
import AuthModel from '../auth/modelo.auth.mjs'
import 'dotenv/config'

export const protegerRuta = async (req, res, next) => {

    const token = req.signedCookies?.token_parcial

    if (!token) {
        if (req.accepts('html')) return res.redirect('/login')
        return res.status(401).json({ error: "Acceso denegado. No se encontró un token activo." })
    }

    // const usuarioVerificado = jwt.verify(token, process.env.FIRMA_JWT)

    jwt.verify(token, process.env.FIRMA_JWT, async (error, payload) => {

        if (error) {
            res.clearCookie('token')

            // if (req.originalUrl.startsWith('/api') || req.originalUrl.startsWith('calcular-')) {
            //     return res.status(401).json({ mensaje: 'Token invalido o expirado' })
            // }

            return res.redirect('/login')
        }

        // const sesionEnBaseDatos = await AuthModel.buscarSesionActiva(token) 

        // if (!sesionEnBaseDatos) {
        //     res.clearCookie('token_parcial')
        //     if (req.accepts('html')) return res.redirect('/login')
        //     return res.status(401).json({ error: "Sesión inválida o expirada en la base de datos." })
        // }

        // req.usuario = usuarioVerificado
        next()
    })
}