export const registrarActividad = (req, res, next) => {
    const ahora = new Date().toLocaleString()

    const metodo = req.method
    const url = req.url

    // Imprimimos un log técnico en la consola del servidor
    console.log(`[${ahora}] Solicitud procesada: ${metodo} en la ruta ${url}`)

    next()
}