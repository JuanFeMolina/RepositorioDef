import { Router } from 'express'
import * as controladorProcesos from './controlador.procesos.mjs'

const rutasProcesos = new Router()

// Definimos la ruta del procedimiento de búsqueda por marca
rutasProcesos.get('/procedimiento/buscar-por-marca/:marca', controladorProcesos.buscarPorMarca)

export default rutasProcesos