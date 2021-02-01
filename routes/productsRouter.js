const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const path = require('path')

// ************ Controller Require ************
const productsController = require('../controllers/productsController');
const userAuth = require('../middlewares/userAuth')

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

var upload = multer({
    storage,
 
    // Validate image
    fileFilter: (req, file, cb) => {
 
       const acceptedExtensions = ['.jpg', '.jpeg', '.png', '.gif'];
 
       const ext = path.extname(file.originalname);
       
       if (!acceptedExtensions.includes(ext)) {
          req.file = file;
       }
 
       cb(null, acceptedExtensions.includes(ext));
    }
 });
 

/*** localhost:3000/products/ ***/
//router.get('/', productsController.list);


/*** localhost:3000/products/productCreate ***/
router.get('/productCreate', userAuth,productsController.create);
/*** localhost:3000/products/ ***/
router.post('/', upload.any(), [
    check('product_name')
        .isLength( {min: 1})
        .withMessage('Por favor, ingrese un nombre para el producto a cargar'),
        check('product_category')
        .isLength( {min: 1})
        .withMessage('Por favor, ingrese una categoria para el producto'),
    check('product_description')
        .isLength( {min: 1} )
        .withMessage('Por favor, ingrese una descripcion para el producto'),
        check('product_quantity')
        .isInt( {min: 1})
        .withMessage('La cantidad no puede ser cero'),
    check('product_price')
    .isInt( {min: 1})
    .withMessage('El precio no puede ser cero'),
    check('product_discount')
    .isInt( {min: 0, max: 100})
    .withMessage('El descuento no puede ser negativo ni mayor a 100'),
],
productsController.store);


/*** localhost:3000/products/detail/:id ***/
//http://localhost:3000/products/detail/4/
router.get('/detail/:id', productsController.show);

/*** localhost:3000/products/:id/edit ***/
//http://localhost:3000/products/4/edit
router.get('/:id/edit', userAuth, [
    check('name')
    .isEmpty()
    .withMessage('Por favor, ingrese un título')
], userAuth, productsController.edit);

/*** localhost:3000/products/:id ***/
router.put('/:id', upload.any(), [
    check('product_name')
        .isLength( {min: 1})
        .withMessage('Por favor, ingrese un nombre para el producto a cargar'),
        check('product_category')
        .isLength( {min: 1})
        .withMessage('Por favor, ingrese una categoria para el producto'),
    check('product_description')
    .isLength( {min: 1} )
        .withMessage('Por favor, ingrese una descripcion para el producto'),
        check('product_quantity')
        .isInt( {min: 1})
        .withMessage('La cantidad no puede ser cero'),
    check('product_price')
        .isInt( {min: 1})
        .withMessage('El precio no puede ser cero'),
        check('product_discount')
        .isInt( {min: 0, max: 100})
        .withMessage('El descuento no puede ser negativo ni mayor a 100'),
    ], productsController.update);

    /*** localhost:3000/products/:id ***/
router.delete('/:id/delete', productsController.destroy);

/*** localhost:3000/products/:id ***/
router.post('/:id/addToCart', productsController.addToCart);

/*** PRODUCT CART ***/
/*** localhost:3000/products/productCart ***/
//router.get('/productCart', productsController.cart);

/*** localhost:3000/categories/1 ***/
router.get('/categories/:category?', productsController.categories);

module.exports = router;