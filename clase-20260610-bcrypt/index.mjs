import express from 'express';
import pool from './conexion.bd.mjs';
import cookieParser from 'cookie-parser';
import bcrypt from 'bcryptjs';

const PUERTO = 3000;

////////////////

////////////////
const app = express();
app.use(express.json()) //vamos a recibir datos json, lo convierte en javascript(objeto) y lo guarda en body
app.use(express.urlencoded({ extended: true }))

//adm crud
app.use('/admin', express.static('./fronts/front-admin'))

//login
app.use('/login', express.static('./fronts/front-login'))


app.post('/autenticar', (req, res)=>{
    //actividad 5
    // generar el id con nanoId

})


app.post('/registrar', async (req, res) => {
    //capturamos los datos
    console.log(req.body)
    const { usuario, pass } = req.body

    //control
    if (!usuario || !pass) {
        return res.status(400).json({
            mensaje: 'datos incompletos'
        })
    }

    //encriptamos clave (usar siempre try catch)
    const salt = await bcrypt.genSalt(10); //previene el ataque arcoiris de fuerza bruta


    const hash = await bcrypt.hash(pass, salt);
    console.log(hash)

    //guardamos en la bd
    //usar try catch
    const resultado = await pool.query(`
        INSERT INTO usuarios 
            (username, password_hash)
        VALUES 
            ($1, $2)
        RETURNING
            id, username    
        `, 
        [
            usuario, 
            hash
        ]
    )

    if(resultado.rowCount > 0){
        return res.json({
            mensaje: `El usuario ${usuario} se ha registrado con èxito`
        })
    }
    res.json(500).json({
        mensaje: 'El registro no se pudo realizar'
    })

})

app.listen(PUERTO, () => {
    console.log(`Servidor escuchando en el puerto ${PUERTO}`);
});