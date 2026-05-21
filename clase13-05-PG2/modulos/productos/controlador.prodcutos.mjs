import * as modelo from './modelo.productos.mjs'
import * as vista from './vista.productos.mjs'
//modelo es un espacio de nombres

export async function obtenerTodos(req, res) {
    const productos = await modelo.obtenerTodos()
    const respuestaVista = vista.obtenerTodos(productos)

    res.json(productos)
}

export async function obtenerUno(req, res) {
    const idProducto = Number(req.params.id)
    const producto = await modelo.obtenerUno(idProducto)
    const resultado = vista.obtenerUno(producto)

    if (resultado.length > 0) {
        res.status(200).json(resultado)
    } else {
        res.status(404).json({ mensaje: `Producto con id ${idProducto} no encontrado` })
    }
}

export async function eliminarUno(req, res) {
    const idProducto = Number(req.params.id)
    const producto = await modelo.eliminarUno(idProducto)
    const resultado = vista.eliminarUno(producto)

    if (resultado.length > 0) {
        res.status(200).json(resultado)
    } else {
        res.status(404).json({ mensaje: `Producto con id ${idProducto} no encontrado` })
    }
}

