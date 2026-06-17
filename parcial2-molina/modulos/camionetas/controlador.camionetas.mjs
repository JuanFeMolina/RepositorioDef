import * as modeloCamionetas from './modelo.camionetas.mjs' //Importamos las funciones del modelo para utilizarlas en el controlador

//Funcion para obtener todas las camionetas
export const obtenerTodas = async (req, res) => {
    try {
        const camionetas = await modeloCamionetas.obtenerTodas() //Llamamos a la función del modelo para obtener los datos
        res.status(200).json(camionetas) // status 200 porque es una consulta existosa
    } catch (error) {
        res.status(500).json({ "error": "Error al obtener los datos" })
    }
}



//Funcion para obtener una camioneta por ID
export const obtenerPorId = async (req, res) => {    
    try {
        const idBuscado = parseInt(req.params.id) // Capturamos el ID de la ruta
        
        if (!idBuscado && idBuscado !== 0) {
            return res.status(400).json({ error: "Debes ingresar un número de ID válido" })
        }

        // Le pasamos el ID numérico a la función del modelo
        const encontrada = await modeloCamionetas.obtenerPorId(idBuscado)

        if (!encontrada) {
            return res.status(404).json({ "mensaje": "Camioneta no encontrada" }) 
        }
        
        res.status(200).json(encontrada)

    } catch (error) {
        res.status(500).json({ "error": "Error al buscar por ID" })
    }
}