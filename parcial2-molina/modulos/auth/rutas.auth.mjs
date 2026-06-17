import { Router } from 'express'

import { login, salir } from './controlador.auth.mjs'

const rutasAuth = new Router()

rutasAuth.post('/autenticacion', login)
rutasAuth.post('/salir', salir)

export default rutasAuth