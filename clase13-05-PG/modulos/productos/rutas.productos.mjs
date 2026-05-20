// import express from 'express'
import {Router} from 'express'
import * as controlador from './controlador.prodcutos.mjs'

const rutasProductos = new Router()

rutasProductos.get('/api/v1/productos', controlador.obtenerTodos)
rutasProductos.get('/api/v1/productos/:id', controlador.obtenerUno)  

export default rutasProductos 