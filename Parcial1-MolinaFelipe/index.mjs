import express from 'express'
import { obtenerTodas, obtenerPorId, buscarporMarca } from './funciones.mjs'
import { registrarActividad } from './middleware.mjs'

const app = express()
const PUERTO = 3000

app.use(registrarActividad)

app.get('/vehiculos', obtenerTodas)
app.get('/vehiculos/:id', obtenerPorId)

app.get('/procedimiento/buscar-por-marca/:marca', buscarporMarca)

app.listen(PUERTO, () => {
    console.log('Clickea para probar el log: http://localhost:3000/vehiculos ')
})