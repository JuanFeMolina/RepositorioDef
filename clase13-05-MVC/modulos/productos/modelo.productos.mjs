import productos from "../../productos.mjs";

export function obtenerTodos() {
    /*haria una consulta a una BD*/
    return productos
}

export function obtenerUno(id) {

    const productosFiltrados = productos.datos.filter((producto) => {
        return Number(producto.id) === id
    })
    return productosFiltrados
}
