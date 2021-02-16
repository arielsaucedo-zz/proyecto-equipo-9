// ************ Require's ************
const createError = require('http-errors')
const cookieParser = require('cookie-parser')
const express = require('express')
const logger = require('morgan')
const path = require('path')
const methodOverride =  require('method-override') // Pasar poder usar los métodos PUT y DELETE
let session = require('express-session')
let rememberMe = require('./middlewares/rememberMe')
let db = require('./database/models') // Referencia a los modelos
// ************** carga de archivo de productos para almacenar luego las categorías **********************

const cartMiddleware = require('./middlewares/cart');
const helpersMiddleware = require('./middlewares/helpers')

// ************ express() - (don't touch) ************
const app = express()
var cors = require('cors');
// ************ Middlewares - (don't touch) ************
app.use(cors());
app.use(express.static(path.join(__dirname, 'public'))) // Necesario para los archivos estáticos en el folder /public
app.use(express.urlencoded({ extended: false }))
app.use(logger('dev'))
app.use(express.json())
app.use(cookieParser())
app.use(methodOverride('_method')) // Pasar poder pisar el method="POST" en el formulario por PUT y DELETE
app.use(session(
  {
    secret: 'secreto',
    resave: false,
    saveUninitialized: true
  }
))

app.use(rememberMe)

// ************ Template Engine - (don't touch) ************
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'src', 'views')) // Define la ubicación de la carpeta de las Vistas

// My middlewares
//app.use(logMiddleware);
app.use(cartMiddleware);
app.use(helpersMiddleware);

app.use(function(req, res, next){
  if(req.session.user != undefined){
    res.locals.user = req.session.user
    res.locals.first_name = req.session.first_name
    res.locals.last_name = req.session.last_name
    res.locals.userId = req.session.userId
    res.locals.image_avatar = req.session.image_avatar
    res.locals.role_id = req.session.role_id
  }
  db.Categories.findAll({
    include: ['products']
  })
  .then(function(Categories){ 
    res.locals.listOfCategories = Categories
    next()
  })
  .catch(function(error){
    console.log(error)
    res.send('')
  })
})
// ************ Route System require and use() ************
const indexRouter = require('./routes/indexRouter')
const usersRouter = require('./routes/usersRouter')
const productsRouter = require('./routes/productsRouter')
const emailRouter = require('./routes/emailRouter')
// ************ Route System require - APIs ************
const apiUsersRouter = require('./routes/api/usersApiRouter')
const productsApiRouter = require('./routes/api/productsApiRouter')
const productsExtraApiRouter = require('./routes/api/productsExtraApiRouter')

app.use('/', indexRouter)
app.use('/users', usersRouter)
app.use('/products', productsRouter)
app.use('/contact', emailRouter)

// ************ API´s Routes************
app.use("/api/users", apiUsersRouter)
app.use("/api/products", productsApiRouter)
app.use("/api/productsExtra", productsExtraApiRouter)


// ************ catch 404 and forward to error handler ************
app.use((req, res, next) => next(createError(404)))

// ************ error handler ************
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.path = req.path
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

// ************ exports app - dont'touch ************
module.exports = app
