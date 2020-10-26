// ************ Require's ************
const express = require('express');
const router = express.Router();

// ************ Controller Require ************
const usersController = require('../controllers/usersController')

/*** LOGIN ***/
router.get('/login', usersController.login);

/*** CREATE ONE USER - REGISTER ***/
router.get('/register', usersController.register);
router.post('/', usersController.store); 

module.exports = router;