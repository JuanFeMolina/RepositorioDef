import express from 'express'
// import productos from './datos/productos.mjs'
import rutasProductos from './modulos/productos/rutas.productos.mjs'

const PUERTO = 3000 

const app = express()

app.use(rutasProductos)

app.listen(PUERTO) 