// import fs from 'fs/promises' //Se utiliza el módulo path y fs/promises para manejar la persistencia de datos de forma asíncrona, evitando el bloqueo del event loop
// import path from 'path'

// //Funcion que se encarga de entrar a la carpeta, abrir el JSON y pasarlo a un formato que JavaScript entienda
// const leerDatos = async () => {

//     const rutaArchivo = path.join('datos', 'vehiculos.json')

//     const contenido = await fs.readFile(rutaArchivo, 'utf-8')

//     return JSON.parse(contenido)
// }

// //Funcion para obtener todas las camionetas
// export const obtenerTodas = async (req, res) => {
//     try {
//         const camionetas = await leerDatos()
//         res.status(200).json(camionetas) // status 200 porque es una consulta existosa
//     } catch (error) {
//         res.status(500).json({ "error": "Error al obtener los datos" })
//     }
// }
// //Funcion para obtener una camioneta por ID
// export const obtenerPorId = async (req, res) => {
//     try {
//         const camionetas = await leerDatos()

//         const idBuscado = parseInt(req.params.id) // Capturamos el ID de la ruta

//         // Si idBuscado NO existe o NO es un número válido, entra al if
//         if (!idBuscado && idBuscado !== 0) {
//             return res.status(400).json({ error: "Debes ingresar un número de ID válido" })
//         }

//         const encontrada = camionetas.find(cam => cam.id === idBuscado)

//         //validamos si el ID existe en el json o si es mayor al maximo
//         if (!encontrada) {
//             return res.status(404).json({ "mensaje": "Camioneta no encontrada" }) //Si el ID no existe, aplico un Manejo de Errores devolviendo un Status 404
//         }
//         res.status(200).json({ "mensaje": encontrada })

//     } catch (error) {
//         res.status(500).json({ "error": "Error al buscar por ID" })
//     }
// }

//Funcion de buscar camionetas por marcas
export const buscarporMarca = async (req, res) => {
    try {
        const camionetas = await leerDatos()

        const marcaBuscada = req.params.marca.toLowerCase() //aca utilizamos toLowerCase para que la búsqueda sea insensible a mayúsculas 
        const resultados = camionetas.filter(v => v.marca.toLowerCase() === marcaBuscada) //filtramos el json comparando en minusculas

        if(resultados.length === 0 ){
            return res.status(404).json({"error": "No se encontraron vehículos de esa marca"})
        }

        //calculamos metricas sobre los resultados filtrados
        const cantidadTotal = resultados.length
        const cantidadNuevos = resultados.filter(v => v.estado === "Nuevo").length
        const cantidadUsados = resultados.filter(v => v.estado === "Usado").length

        //respuestas
        res.status(200).json({
            marca: req.params.marca,
            resumen: 
            {
                total: cantidadTotal,
                nuevos: cantidadNuevos,
                usados: cantidadUsados
            }
        })

    } catch (error) {
        res.status(500).json({ "error": "Error al procesar la búsqueda por marca" }) //controlamos el error
    }
}


