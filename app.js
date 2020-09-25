/*  Instanciar variables a utilizar - Carga de modulo Express */
const express = require("express")
const app = express()
const path = require("path")

/* Ruta raiz */
app.get("/", function(req, res) {
    let rutafile = path.resolve('scr/index.html')    
    res.sendFile(rutafile)
})

/* Llamado a servidor - Puerto 3000 */
app.listen(3000)