import express from 'express'
import cookieParser from 'cookie-parser'
import e from 'express'

const PUERTO = 3000

const app = express()

app.use(cookieParser('clavesecreta'))

//json
app.use(express.json())

//urlencoded
app.use(express.urlencoded({ extended: true }))


//adm
function chequearCookie(req, res, next) {
    const sesionId = req.signedCookies['sesionId']

    if(sesionId === 'minumerodesesion'){
        return next()
    }
    return res.redirect('/login')
}


app.use('/admin', chequearCookie, express.static('./front-end/front-admin'))

//login
app.use('/login', express.static('./front-end/front-login'))



//ruta que va a gestionar el acceso y autenticacion
app.post('/autenticacion', (req, res) => {

    const { usuario, clave } = req.body
    if (usuario != 'admin' || clave != '123456') {
        return res.redirect('/login')
    }
    //generar cabeceras
    res.cookie('sesionId', 'minumerodesesion', {
        signed: true,
        httpOnly: true,
        sameSite: 'lax',
        secure: true,
        maxAge: 1000 * 20
    })
    //res.send('Logueado')
    res.redirect('/admin')
})


app.listen(PUERTO)
