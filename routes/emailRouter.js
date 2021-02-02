const express = require('express');
const emailController = require('../controllers/emailController');
const router = express.Router();

router.get('/', emailController.contact);

/* Envío de E-mail */
router.post('/email', emailController.sendEmail);

module.exports = router;