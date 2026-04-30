import express from 'express'

const PUERTO = 3000

const app = express()

async function middleware(req, res, next) {

    try {

        console.log('middleware ejecutándose')

        const codigoParam = Number(req.params.codigo)
        const response = await fetch('http://localhost:4321/usuario')
        const dat = await response.json()

        const codCorrecto = dat.codigo

        if (codigoParam === codCorrecto) {
            return next()
        }
        return res.status(400).json({ mensaje: "El código es incorrecto" })

    } catch (error) {
        console.error(error)
        return res.status(500).json({ mensaje: "Error al validar el código" })
    }
}


app.get('/:codigo', middleware, (req, res) => {

    res.status(500).json({ mensaje: "El código es correcto" })

})

app.listen(PUERTO, () => {

    console.log(`http://localhost:${PUERTO}`)

})