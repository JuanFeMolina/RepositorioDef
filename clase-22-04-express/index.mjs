import express from 'express'

const PUERTO = 3000

//instancia servidor express
const app = express()

app.get('/saludo', (red, res) => {

    res.set('content-type', 'text/html') // cabecera

    res.status(200) //codigo de estado
    res.end("<h1>hola vecino</h1>") //cuerpo o contenido
})

app.get('/materias', (red, res) => {

    res.set('content-type', 'application/json') // cabecera

    res.status(200) //codigo de estado
    res.end(`
    [ 
        {
            "materia": "base de datos",
            "carrera": "analista en sistemas"
        }
        {
            "materia": "pp2",
            "carrera": "analista en sistemas"
        }
        {
            "materia": "analisis de sistemas",
            "carrera": "analista en sistemas"
        }
    ]
        `) 
 })


app.get('/pregunta', (red, res) => {
    res.status(204).end('como vas con la cufa?')
})


app.post('/finde', (red, res) => {
    res.set('content-type', 'application/json')
    res.end('que onda el viernes?')
})

app.post('/sopi', (red, res) => {
    res.end('gaga')
})

//abrir un puerto
app.listen(PUERTO, () => {
    console.log(`servidor corriendo en http://localhost:${PUERTO}`)
})


