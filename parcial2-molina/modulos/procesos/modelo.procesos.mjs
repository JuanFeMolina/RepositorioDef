import * as modeloCamionetas from '../camionetas/modelo.camionetas.mjs'

export const buscarVehiculosPorMarca = async (marcaBuscada) => {
    try {
        const camionetas = await modeloCamionetas.obtenerTodas()

        // Filtramos las camionetas que coincidan con la marca ingresada (pasamos a minúsculas para evitar errores de tipeo)
        const filtradas = camionetas.filter(cam => cam.marca.toLowerCase() === marcaBuscada.toLowerCase())

        if (filtradas.length === 0) {
            return null
        }

        const cantidadTotal = filtradas.length // Cantidad de camionetas encontradas
        
        // Sumamos los precios de todas las camionetas filtradas usando reduce
        const sumaPrecios = filtradas.reduce((acumulador, cam) => acumulador + cam.precio, 0)
        
        // Calculamos el promedio y lo dejamos con 2 decimales fijos
        const promedioPrecio = parseFloat((sumaPrecios / cantidadTotal).toFixed(2))

        // Retornamos el objeto estructurado con las métricas y la lista final
        return {
            marca: marcaBuscada,
            cantidad_encontrada: cantidadTotal,
            promedio_precio: promedioPrecio,
            vehiculos: filtradas
        }

    } catch (error) {
        console.log("Error lógico en el modelo de procesos: ", error)
        throw error
    }
}