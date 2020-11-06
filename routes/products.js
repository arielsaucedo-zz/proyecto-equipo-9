const express = require('express');
const router = express.Router();

const productsController = require('../controllers/productsController');

/*** Listado de productos ***/
router.get('/productsList', productsController.list);

/*** Formulario de creación de productos ***/
router.get('/productCreate', productsController.create);
//router.post('/', productsController.store);

/*** ONE PRODUCT DETAIL ***/
router.get('/productDetail/:id', productsController.detail);

/*** Formulario de edición de producto ***/
router.get('/:id/edit', productsController.edit);
//router.put('/:id', productsController.update);

/*** DELETE ONE PRODUCT***/ 
//router.delete('/:id/delete', productsController.destroy);

/*** PRODUCT CART ***/
router.get('/productCart', productsController.cart);

module.exports = router;