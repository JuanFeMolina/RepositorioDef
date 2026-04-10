import fsp from 'node:fs/promises'
import path from 'node:path'

try{
   // hacer una peticion con feth
    const respuesta = await fetch('https://69d676ce1c120e733cce4248.mockapi.io/Productos')
  // extraemos del cuerpo de la peticion los datos
  
    const productos = await respuesta.json() //transforma el cuerpo " cadenas de texto" a un objeto de .JS
  // creamos la ruta
    //const ruta = path.join('.', 'api.txt')

    const ruta = path.join('.', 'api.json')
  //guardar los datos en un archivo
    const contenido = JSON.stringify(productos, null, 4) // pasa js a formato json (texto)

    await fsp.writeFile(ruta, contenido)
  

}catch(e){
    console.log(e)
}
