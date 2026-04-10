import fsp from 'node:fs/promises'
import path from 'node:path'

export async function guardarDatos(nombreArchivo, datos) {
    const ruta = path.resolve(nombreArchivo)
    await fsp.writeFile(ruta, JSON.stringify(datos, null, 3))
    return ruta
}

export async function leerDatos(ruta) {
    const contenido = await fsp.readFile(ruta, 'utf-8')
    return JSON.parse(contenido)
}