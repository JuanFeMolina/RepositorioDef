import http from 'node:http'
import fsp from 'node:fs/promises'
import path from 'node:path'

const app = http.createServer(async (peticion, respuesta) => {

    if (peticion.method === 'GET') {

        if (peticion.url === '/usuarios') {
            try {
                const res = await fetch('https://api.escuelajs.co/api/v1/users')
                const dato = await res.json()

                const rutaArchivo = path.join('./usuarios.json')
                const contenido = JSON.stringify(dato, null, 8)
                await fsp.writeFile(rutaArchivo, contenido)
                const datosGuardados = await fsp.readFile(rutaArchivo, 'utf-8')

                respuesta.statusCode = 200
                return respuesta.end(datosGuardados)

            } catch (error) {
                console.error(error)
                respuesta.statusCode = 500
                respuesta.end('error')
            }
        }

        if (peticion.url === '/usuarios/filtrados') {
            try {
                const rutaArchivo = path.join('./usuarios.json')
                const datosArc = await fsp.readFile(rutaArchivo, 'utf-8')
                const usuariosArray = JSON.parse(datosArc)

                const usuariosFiltrados = usuariosArray.filter((us) => {return us.id < 10})
                respuesta.statusCode = 200
                respuesta.setHeader('Content-Type', 'application/json; charset=utf-8')
                return respuesta.end(JSON.stringify(usuariosFiltrados, null, 8))

            } catch (error) {
                console.error(error)
                respuesta.statusCode =500
                respuesta.end('error')
            }
        }

        respuesta.statusCode = 404
        respuesta.end('Recurso no encontrado')

    }
})

app.listen(3000, () => {
    console.log('servidor corriendo en http://localhost:3000')
})


