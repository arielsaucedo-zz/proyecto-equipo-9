var express = require('express');
var router = express.Router();

const newProductController = require('../controllers/newProductController');

router.get('/', newProductController.create);

module.exports = router;