// ************ Require's ************
const createError = require('http-errors')
const cookieParser = require('cookie-parser')
const express = require('express')
const logger = require('morgan')
const path = require('path')
const methodOverride =  require('method-override') // Pasar poder usar los métodos PUT y DELETE
let session = require('express-session')
let rememberMe = require('./middlewares/rememberMe')
// ************ express() - (don't touch) ************
const app = express()

// ************ Middlewares - (don't touch) ************
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

app.use(function(req, res, next){
  if(req.session.user != undefined){
    res.locals.user = req.session.user
    res.locals.first_name = req.session.first_name
    res.locals.last_name = req.session.last_name
  }
  return next()
})


// ************ Template Engine - (don't touch) ************
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'src', 'views')) // Define la ubicación de la carpeta de las Vistas


// ************ Route System require and use() ************
const indexRouter = require('./routes/index')
const usersRouter = require('./routes/users')
const productsRouter = require('./routes/products')

app.use('/', indexRouter)
app.use('/users', usersRouter)
app.use('/products', productsRouter)


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
