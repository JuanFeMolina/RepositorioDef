// leer una api

try{
   // hacer una peticion con feth
  const respuesta = await fetch('https://69d676ce1c120e733cce4248.mockapi.io/Productos')
  // extraemos del cuerpo de la peticion los datos
  const productos = await respuesta.json() //transforma el cuerpo " cadenas de texto" a un objeto de .JS
  console.log(productos)
}catch(e){
    console.log(e)
}
