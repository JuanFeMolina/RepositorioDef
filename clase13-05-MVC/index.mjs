import express from 'express'
// import productos from './datos/productos.mjs'
import * as controlador from './modulos/productos/controlador.prodcutos.mjs'

const PUERTO = 3000 

const app = express()

app.get('/api/v1/productos', controlador.obtenerTodos)
app.get('/api/v1/productos/:id', controlador.obtenerUno)  

app.listen(PUERTO) 