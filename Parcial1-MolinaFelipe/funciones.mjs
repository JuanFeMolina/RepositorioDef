import fs from 'fs/promises' //Se utiliza el módulo path y fs/promises para manejar la persistencia de datos de forma asíncrona, evitando el bloqueo del event loop
import path from 'path'

const leerDatos = async () => {

    const rutaArchivo = path.join('datos', 'vehiculos.json')

    const contenido = await fs.readFile(rutaArchivo, 'utf-8')

    return JSON.parse(contenido)
}

//Funcion para obtener todas las camionetas
export const obtenerTodas = async (req, res) => {
    try {
        const camionetas = await leerDatos()
        res.status(200).json(camionetas)
    } catch (error) {
        res.status(500).json({ "error": "Error al obtener los datos" })
    }
}

//Funcion para obtener una camioneta atraves por ID
export const obtenerPorId = async (req, res) => {
    try {
        const camionetas = await leerDatos()
        const idBuscado = parseInt(req.params.id) // Capturamos el ID de la ruta

        const encontrada = camionetas.find(cam => cam.id === idBuscado)

        if (!encontrada) {
            return res.status(404).json({ "mensaje": "Camioneta no encontrada" })
        }
        res.status(200).json({ "mensaje": encontrada })

    } catch (error) {
        res.status(500).json({ "error": "Error al buscar por ID" })
    }
}

//Funcion de buscar camionetas por marcas
export const buscarporMarca = async (req, res) => {
    try {
        const camionetas = await leerDatos()

        const marcaBuscada = req.params.marca.toLowerCase() //pasamos a minuscula la marca para que sea mas facil de buscar
        const resultados = camionetas.filter(v => v.marca.toLowerCase() === marcaBuscada) //filtramos el json comparando en minusculas

        //respuesta
        res.status(200).json(resultados)

    } catch (error) {
        res.status(500).json({ "error": "Error al procesar la búsqueda por marca" }) //controlamos el error
    }
}

