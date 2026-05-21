import pool from '../../conexion.mjs'

export async function obtenerTodos() {
    /*haria una consulta a una BD*/
    const resultado = await pool.query("select * from productos")
    console.log(resultado)

    return resultado.rows
}

export async function obtenerUno(id) {

    const resultado = await pool.query('SELECT * FROM productos WHERE id=$1', [id])
    return resultado.rows
}

export async function eliminarUno(id) {

    const resultado = await pool.query('DELETE FROM productos WHERE id=$1 RETURNING id, producto, precio', [id])
    return resultado.rows
}
