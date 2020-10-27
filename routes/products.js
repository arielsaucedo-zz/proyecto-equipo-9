const express = require('express');
const router = express.Router();

const productsController = require('../controllers/productsController');

/*** CREATE ONE PRODUCT ***/
router.get('/new-product', productsController.create);
router.post('/', productsController.store);

/*** EDIT ONE PRODUCT ***/
router.get('/edit-product', productsController.edit);
router.put('/', productsController.store);

module.exports = router;