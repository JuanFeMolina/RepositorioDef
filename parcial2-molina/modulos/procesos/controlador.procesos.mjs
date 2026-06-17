import * as modeloProcesos from './modelo.procesos.mjs'

export const buscarPorMarca = async (req, res) => {
    try {
        const marcaBuscada = req.params.marca

        // Llamamos a la función del modelo de procesos pasándole la marca de la URL
        const resultado = await modeloProcesos.buscarVehiculosPorMarca(marcaBuscada)

        // Validamos si el modelo no encontró ninguna camioneta con esa marca
        if (!resultado) {
            return res.status(404).json({ 
                "error": `No se encontraron camionetas de la marca: ${marcaBuscada}` 
            })
        }

        res.status(200).json(resultado)

    } catch (error) {
        console.error("Error en controlador.procesos:", error)
        res.status(500).json({ "error": "Error interno al procesar el procedimiento por marca" })
    }
}