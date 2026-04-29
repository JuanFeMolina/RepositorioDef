import express from 'express'

const PUERTO = 3000

const app = express()

//Middleware

function middleware1(rew, res, next){

    console.log('middleware 1')

    const existeUsuario = false

    if(existeUsuario){
        console.log('usuario existe pasa')
        return next()
    }

    console.log('usuario NO existe')
    res.status(403).send('usuario no registrado')
    
}

app.get('/', middleware1 ,(req, res)=>{

    console.log('ejecucion del callback final')
    res.send('hola')

})


app.listen(PUERTO, ()=>{

    console.log(`http://localhost:${PUERTO}`)

})