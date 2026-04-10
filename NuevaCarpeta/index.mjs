import { obtenerUsuarios } from './api.mjs'
import { guardarDatos, leerDatos } from './archivo.mjs'

const API_URL = 'https://api.escuelajs.co/api/v1/users'
const FILE_NAME = 'date.json'

try {
    const usuarios = await obtenerUsuarios(API_URL)

    const rutaArchivo = await guardarDatos(FILE_NAME, usuarios)
    console.log('Archivo guardado correctamente.')

    const datosLeidos = await leerDatos(rutaArchivo)
    console.log('Datos leídos del archivo:')
    console.table(datosLeidos)

} catch (error) {
    console.error('Error en la aplicación:', error)
}
