import express from 'express'
import path from 'node:path'

const PUERTO = 3000

const app = express()

app.use('/front', express.static(path.resolve('front')))

// function middleware1(rew, res, next){

//     console.log('middleware 1')
//     next()
    
// }

// app.use('/', middleware1)

// app.get('/',(req, res)=>{

//     console.log('ejecucion del callback final')
//     res.send('hola')

// })

// app.get('/saludo',(req, res)=>{

//     console.log('ejecucion del callback final con saludo')
//     res.send('hola ruta /saludo')

// })

app.listen(PUERTO, ()=>{

    console.log(`http://localhost:${PUERTO}`)

})