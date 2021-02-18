const express = require('express');
const router = express.Router();

const productsExtraApiController = require('../../controllers/api/productsExtraApiController');

router.get('/', productsExtraApiController.showAllExtra)
router.get('/lastProductDB', productsExtraApiController.lastProductDB)
router.get('/soldProducts', productsExtraApiController.soldProducts)

module.exports = router;