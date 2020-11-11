const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const productsController = require('../controllers/productsController');

/*** localhost:3000/products/ ***/
router.get('/', productsController.list);

/*** localhost:3000/products/create ***/
router.get('/productCreate', productsController.create);
/*** localhost:3000/products/ ***/
router.post('/', productsController.store);

/*** localhost:3000/products/:id ***/
//http://localhost:3000/products/detail/4/
router.get('/detail/:id', productsController.show);

/*** localhost:3000/products/:id/edit ***/
//http://localhost:3000/products/4/edit
router.get('/:id/edit', [
    check('name')
        .isEmpty()
        .withMessage('Por favor, ingrese un título')
], productsController.edit);

/*** localhost:3000/products/:id ***/
router.put('/:id', productsController.update);

/*** localhost:3000/products/:id ***/
router.delete('/:id/delete', productsController.destroy);



/*** PRODUCT CART ***/
router.get('/productCart', productsController.cart);

module.exports = router;