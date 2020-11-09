const express = require('express');
const router = express.Router();

const productsController = require('../controllers/productsController');

/*** localhost:3000/products/ ***/
router.get('/', productsController.list);

/*** localhost:3000/products/create ***/
router.get('/productCreate', productsController.create);


/*** localhost:3000/products/:id ***/
router.get('/:id', productsController.show);

/*** localhost:3000/products/:id/edit ***/
router.get('/:id/edit', productsController.edit);

/*** localhost:3000/products/ ***/
router.post('/', productsController.store);

/*** localhost:3000/products/:id ***/
router.put('/:id', productsController.update);

/*** localhost:3000/products/:id ***/
router.delete('/:id/delete', productsController.destroy);



/*** PRODUCT CART ***/
router.get('/productCart', productsController.cart);

module.exports = router;