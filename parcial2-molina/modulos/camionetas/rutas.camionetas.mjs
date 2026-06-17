import { Router } from 'express'
import {validarId} from '../middlewares/middleware.mjs'
import * as controladorCamionetas from './controlador.camionetas.mjs'

const rutasCamionetas = new Router()

rutasCamionetas.get('/api/v1/vehiculos', controladorCamionetas.obtenerTodas)
rutasCamionetas.get('/api/v1/vehiculos/:id', validarId ,controladorCamionetas.obtenerPorId)

export default rutasCamionetas