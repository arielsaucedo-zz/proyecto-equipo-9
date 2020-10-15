var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/** 
const path = require("path")

/* Ruta raiz 
app.get("/", function (req, res) {
  let rutafile = path.resolve('view/index.html')
  res.sendFile(rutafile)
})

/* Ruta login 
app.get("/login", function (req, res) {
  let rutafile = path.resolve('view/login.html')
  res.sendFile(rutafile)
})

/* Ruta detalle de producto 
app.get("/productDetail", function (req, res) {
  let rutafile = path.resolve('view/productDetail.html')
  res.sendFile(rutafile)
})

/* Ruta - Formulario de registro 
app.get("/register", function (req, res) {
  let rutafile = path.resolve('view/register.html')
  res.sendFile(rutafile)
})

app.get("/productcart", function (req, res) {
  let rutafile = path.resolve('view/productCart.html')
  res.sendFile(rutafile)
})

/* resuelve ruta de estilos e imagenes 
app.get('*', function (req, res) {
  if (req.url.includes('.')) {
      let file = path.resolve('public' + req.url)
      return res.sendFile(file)
  }
  res.send('Not found')
})

*/


module.exports = router;
