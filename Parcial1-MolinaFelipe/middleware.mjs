// Middleware de validación: verifica que el parámetro :id sea un número entero válido
// Se encarga de filtrar la petición antes de que llegue a la lógica de búsqueda.

export const validarId = (req, res, next) => {
    const id = parseInt(req.params.id) //Pasamos el parámetro string de la URL a número entero

    //NOT A NUMBER, si es un string entra al if
    if (isNaN(id) || id <= 0) {
        return res.status(400).json({
            error: "El ID debe ser un número entero positivo"
        })
    }

    next() // El ID es válido, pasamos al siguiente eslabón (obtenerPorId)
}