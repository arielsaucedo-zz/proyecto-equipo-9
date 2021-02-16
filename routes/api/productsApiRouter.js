const express = require('express');
const router = express.Router();

const productsApiController = require('../../controllers/api/productsApiController');

router.get('/', productsApiController.showAll)
router.get('/:id', productsApiController.find)

module.exports = router;