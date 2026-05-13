import * as modelo from './modelo.productos.mjs'
//modelo es un espacio de nombres

export function obtenerTodos(req, res){
    const productos = modelo.obtenerTodos()
    res.json(productos)
}

export function obtenerUno(req, res){


    const idProducto = Number(req.params.id)
    const producto = modelo.obtenerUno(idProducto)
    
    if(producto.length > 0){
        res.status(200).json(producto)
    } else{
        res.status(404).json({mensaje: `Producto con id ${idProducto} no encontrado`})
    }
}

