import fs from 'fs/promises' //Se utiliza el módulo path y fs/promises para manejar la persistencia de datos de forma asíncrona, evitando el bloqueo del event loop
import path from 'path'

//Funcion que se encarga de entrar a la carpeta, abrir el JSON y pasarlo a un formato que JavaScript entienda
const leerDatos = async () => {

    const rutaArchivo = path.join(process.cwd(), 'datos', 'vehiculos.json')

    const contenido = await fs.readFile(rutaArchivo, 'utf-8')

    return JSON.parse(contenido)
}

export const obtenerTodas = async () => {
    try {
        return await leerDatos()
    } catch (error) {
        console.log("Error al obtener los datos: ", error)   
    }
}

//Funcion para obtener una camioneta por ID
export const obtenerPorId = async (id) => {
    try {
        const camionetas = await obtenerTodas()
        const encontrada = camionetas.find(cam => cam.id === id)
        return encontrada || null 
    } catch (error) {
        console.log("Error al obtener por ID en el modelo: ", error)
    }
}