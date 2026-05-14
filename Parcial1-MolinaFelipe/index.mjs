import express from 'express'
// Importamos las funciones y el middleware desde otros archivos para que el proyecto sea modular
import { obtenerTodas, obtenerPorId, buscarporMarca } from './funciones.mjs'
import { validarId } from './middleware.mjs'

const app = express()
const PUERTO = 3000

//rutas bajo el estandar rest
app.get('/api/v1/vehiculos', obtenerTodas)
app.get('/api/v1/vehiculos/:id', validarId ,obtenerPorId)

//ruta de procedimiento
app.get('/procedimiento/buscar-por-marca/:marca', buscarporMarca)

//manejador de errores
app.use((req, res) => {
    res.status(404).json({
        estado: "Error",
        mensaje: "La URL ingresada no existe o es incorrecta.",
        ayuda: "Para utilizar el sistema correctamente, podés copiar y pegar estos links de ejemplo:",
        links_validos: {
            ver_todas: "http://localhost:3000/api/v1/vehiculos",
            ver_por_id: "http://localhost:3000/api/v1/vehiculos/1",
            buscar_por_marca: "http://localhost:3000/procedimiento/buscar-por-marca/toyota"
        }
    })
})

//iniciamos el servidor y ponemos a escuchar las peticiones en el puerto 
app.listen(PUERTO, () => {
    console.log('Clickea para ver todas las camionetas: http://localhost:3000/api/v1/vehiculos ')
    console.log('Buscar por ID: http://localhost:3000/api/v1/vehiculos/1')
    console.log('Buscar por marca: http://localhost:3000/procedimiento/buscar-por-marca/fiat ' )
})