const express = require('express');
const router = express.Router();

const productsController = require('../controllers/productsController');

/*** Listado de productos ***/
router.get('/productsList', productsController.list);

/*** Formulario de creación de productos ***/
router.get('/productsCreate', productsController.create);
//router.post('/', productsController.store);

/*** Detalle de un producto particular ***/
router.get('/products/:id', productsController.edit);
//router.put('/', productsController.store);

/*** Acción de creación (a donde se envía el formulario) ***/
router.post('/productsCreate', productsController.create);
//router.post('/', productsController.store);

/*** PRODUCT DETAIL ***/
//router.get('/productDetail', productsController.detail);

/*** PRODUCT CART ***/
//router.get('/productCart', productsController.cart);

/*** Formulario de edición de productos ***/
router.get('products/:id/edit', );

/*** Acción de edición (a donde se envía el formulario):***/


/*** Acción de borrado ***/


module.exports = router;