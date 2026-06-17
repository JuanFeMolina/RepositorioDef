import express from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'

import rutasCamionetas from './modulos/camionetas/rutas.camionetas.mjs'
import rutasProcesos from './modulos/procesos/rutas.procesos.mjs'
import rutasAuth from './modulos/auth/rutas.auth.mjs'
import * as middleware from './modulos/middlewares/authMiddleware.mjs'

const app = express()

const PUERTO = 3000

app.use(express.json())

app.use(cookieParser(process.env.FIRMA_COOKIE))

app.use('/login', express.static('./fronts/front-html'))
app.use(rutasAuth)

app.use('/admin', middleware.protegerRuta, express.static('./fronts/front-adm'))

//ruta de procedimiento

app.use(middleware.protegerRuta, rutasCamionetas) 
app.use(middleware.protegerRuta, rutasProcesos)

//manejador de errores
app.use((req, res) => {
    res.status(404).json({
        estado: "Error",
        mensaje: "La URL ingresada no existe o es incorrecta.",
        ayuda: "Para utilizar el sistema correctamente, podés copiar y pegar estos links de ejemplo:",
        links_validos: {
            administracion: "http://localhost:3000/admin" 
        }
    })
})

//iniciamos el servidor y ponemos a escuchar las peticiones en el puerto 
app.listen(PUERTO, () => {
    console.log('Clickea para ver entrar al perfil admin: http://localhost:3000/admin')
    })