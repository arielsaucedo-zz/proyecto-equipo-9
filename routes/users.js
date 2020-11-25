// ************ Require's ************
const express = require('express');
const { check } = require('express-validator');
const router = express.Router();
let userValidator = require('../middlewares/user-validator')
const path = require('path')

// ************ Controller Require ************
const usersController = require('../controllers/usersController')

// ************ Multer Require ************
var multer  = require('multer')
var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/images/uploads_users')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
});
var upload = multer({ storage: storage });
    

/*** LOGIN ***/
router.get('/login', usersController.login)
router.post('/login', [
    check('user_name')
        .isEmail()
        .withMessage('Por favor, ingrese una dirección de correo electrónico válida'),
],
usersController.processLogin);

/*** LOGOUT ***/
router.post('/logout', usersController.logout)

/*** CREATE ONE USER - REGISTER ***/
router.get('/register', usersController.register);
router.post('/', [
    check('first_name')
        .isLength( {min: 1})
        .withMessage('Por favor, ingrese su nombre'),
    check('last_name')
        .isLength( {min: 1})
        .withMessage('Por favor, ingrese su apellido'),
    check('user_name')
        .isEmail()
        .withMessage('Por favor, ingrese una dirección de correo electrónico válida'),
    check('password_initial')
        .isLength( {min: 8})
        .withMessage('La contraseña debe contener al menos 8 caracteres')
        .custom((value,{req, loc, path}) => {
            if (value !== req.body.password_confirmation) {
                throw new Error('Las contraseñas no coinciden, por favor corrija.');
            } else {
                return value;
            }
        }),
], userValidator, upload.any(), usersController.store); 

module.exports = router;