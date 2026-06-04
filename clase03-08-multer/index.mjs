import express from 'express'
import multer from 'multer'
import {nanoid} from 'nanoid'
import mime from 'mime-type'

const PUERTO = 3000

const app = express()

const almacenamiento = multer.diskStorage({

    //-------------------------------------
    //destino de almacenamiento
    destination: function (req, file, cb) {
        //chequeos

        cb(null, './archivos')
    },

    //-------------------------------------
    //gestion del nombre
    filename: function (req, file, cb) {

        // obtengo la extension desde el mimetype
        //const extensionArchivo = mime.extensionArchivo(file.mimetypes)
        // creo el nombre del archivo con un identificador unico nanoid
        const nombreImg = nanoid() + '.png' // '.'  + extensionArchivo //genera un id
        cb(null, nombreImg)
    }

})

//ejecutamos multer
const subirArchivo = multer({
    storage: almacenamiento
})

const gestionArchivos = subirArchivo.single('imagen')

app.use('/adm', express.static('./front-adm'))

//ruta y metodo
app.post('/subir-archivo', (req, res) => {

    gestionArchivos(req, res, (error) => {
        //si hay error respondemos
        if (error) return res.status(500).json({ mensaje: 'Error en el servidor' })

        //si no hay error 
        console.log(req.file)

        res.json({ mensaje: 'ruta subida de archivos formularios' })
    })

})

app.listen(PUERTO)
