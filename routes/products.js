const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const path = require('path')

// ************ Controller Require ************
const productsController = require('../controllers/productsController');

// ************ Multer Require ************
var multer  = require('multer')
var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/images/products')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
});
var upload = multer({ storage: storage });


/*** localhost:3000/products/ ***/
router.get('/', productsController.list);

/*** localhost:3000/products/productCreate ***/
router.get('/productCreate', productsController.create);
/*** localhost:3000/products/ ***/
router.post('/', upload.any(), 
    [check('product_name')
        .isLength( {min: 1})
        .withMessage('Por favor, ingrese un nombre para el producto a cargar'),
    ], 
    productsController.store);


/*** localhost:3000/products/detail/:id ***/
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
/*** localhost:3000/products/productCart ***/
router.get('/productCart', productsController.cart);

module.exports = router;