//modulo http
import http from 'node:http'
import fsp from 'node:fs/promises'
import path from 'node:path'

const app = http.createServer(async (peticion, respuesta) => { // se va a ejecutar solamente cuando haya una peticion o request
    //console.log('peticion recibida')

    //console.log(peticion.url)

if(peticion.method === 'GET'){

    if (peticion.url === '/') {
        respuesta.statusCode = 200
        return respuesta.end('estas en la raiz')
    }

    if(peticion.url === '/suma'){
        const resultado = (5 + 3).toString()
        respuesta.statusCode = 200
        return respuesta.end(resultado)
    }
}

if(peticion.method === 'POST'){
    if(peticion.url === '/proceso-formulario'){
    
        // respuesta.on('data', ((datos)=>{
        //     console.log(datos)
        // })

        return respuesta.end('se hizo una peticion con verbo POST')
    }
    if(peticion.url === '/guardar-datos'){
        const respuestaApi = await fetch('https://api.escuelajs.co/api/v1/users')
        const datosApi = await respuestaApi.text() 

        try{
            await fsp.writeFile(path.join('./datosapi.txt'),datosApi)
            respuesta.statusCode = 201
            return respuesta.end('datos guardados')
        }catch(error){
            respuesta.statusCode = 500
            return respuesta.end('error en el servidor')
        }
    }

}

    respuesta.statusCode = 404
    respuesta.end('recurso no encontrado')
    


    //respuesta.end('hola servidor') //<-- es lo ultimo que tiene que aparecer
})


app.listen(3000, () => {
    console.log('servidor corriendo en http://localhost:3000')
})  