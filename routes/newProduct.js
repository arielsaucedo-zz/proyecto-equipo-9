const express = require('express');
const router = express.Router();

const newProductController = require('../controllers/newProductController');

router.get('/', newProductController.create);

module.exports = router;