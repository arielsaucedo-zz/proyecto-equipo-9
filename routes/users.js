// ************ Require's ************
const express = require('express');
const { check } = require('express-validator');
const router = express.Router();

// ************ Controller Require ************
const usersController = require('../controllers/usersController')

/*** LOGIN ***/
router.get('/login', usersController.login);

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
        .withMessage('La contrase debe contener al menos 8 caracteres'),
    check('password_confirmation')
        .isLength( {min: 8})
// agregar validación de comparación password_initial vs password_confirmation
], usersController.store); 

module.exports = router;