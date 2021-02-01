// ************ Require's ************
const express = require('express');
const { check } = require('express-validator');
const router = express.Router();
let userValidator = require('../middlewares/user-validator')
const path = require('path')

// ************ Controller Require ************
const usersController = require('../controllers/usersController')
const userAuth = require('../middlewares/userAuth')

let bcryptjs = require('bcryptjs')
let db = require('../database/models')

// ************ Multer Require ************
var multer  = require('multer')
var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/images/uploads_users')
    },
    filename: (req, file, cb) => {
        console.log(file);
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
});
var upload = multer({ storage,
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
    

/*** LOGIN ***/
router.get('/login', usersController.login)
router.post('/login', [
    check('user_name')
        .isEmail()
        .withMessage('Por favor, ingrese una dirección de correo electrónico válida'),
],
usersController.processLogin);

/*** LOGOUT ***/
router.post('/logout', usersController.logout)

/*** CREATE ONE USER - REGISTER ***/
router.get('/register', usersController.register);
router.post('/', upload.any(), [
    check('first_name')
        .isLength( {min: 3})
        .withMessage('Por favor, ingrese su nombre'),
    check('last_name')
        .isLength( {min: 3})
        .withMessage('Por favor, ingrese su apellido'),
    check('user_name')
        .isEmail()
        .withMessage('Por favor, ingrese una dirección de correo electrónico válida'),
    check('password_initial')
        .isLength( {min: 8})
        .withMessage('La contraseña debe contener al menos 8 caracteres')
        .custom((value,{req, loc, path}) => {
            if (value !== req.body.password_confirmation) {
                throw new Error('Las contraseñas no coinciden, por favor corrija.');
            } else {
                return value;
            }
        }),
], userValidator, usersController.store); 


/** UPDATE USER */
router.get('/userDetail/:id/edit', userAuth, usersController.show);
router.put('/:id', upload.any(),
[
    check('first_name')
        .isLength( {min: 1})
        .withMessage('Por favor, ingrese su nombre'),
    check('last_name')
        .isLength( {min: 1})
        .withMessage('Por favor, ingrese su apellido'),
    check('user_name')
        .isEmail()
        .withMessage('Por favor, ingrese una dirección de correo electrónico válida'),
/*     check('password_initial')
        .isLength( {min: 8})
        .withMessage('La contraseña debe contener al menos 8 caracteres')
        .custom((value,{req, loc, path}) => {
            if (value !== req.body.password_confirmation) {
                throw new Error('Las contraseñas no coinciden, por favor corrija.');
            } else {
                return value;
            }
        }) 
*/
], usersController.update)

router.get('/userDetail/:id/changePassword', userAuth, usersController.showChangePassword);
router.put('/userDetail/:id', [
    check('password_old')
        .isLength( {min: 8})
        .withMessage('La contraseña debe contener al menos 8 caracteres')
        .custom((value,{req}) => {
            return db.Users.findOne({
                where: {
                    id: req.params.id
                }
            })
            .then((user) => {
                if(user){
                    if (!bcryptjs.compareSync(value, user.password)) { 
                        return Promise.reject('La contraseña no es correcta o inválida, por favor corrija y vuelva a intentar.')
                    }
                } else {
                    return Promise.reject('La contraseña no es correcta o inválida, por favor corrija y vuelva a intentar.')
                }
            })
        }),
    check('password_new')
        .isLength( {min: 8})
        .withMessage('La contraseña debe contener al menos 8 caracteres')
        .custom((value,{req}) => {
            if (value !== req.body.password_confirmation) {
                throw new Error('Las contraseñas no coinciden, por favor corrija.');
            } else {
                return value;
            }
        }),
], userAuth, usersController.updateChangePassword);

router.get('/cart', userAuth, usersController.cart);
router.post('/addToCart', userAuth, usersController.addToCart);
//router.get('/history', userAuth, usersController.history);
router.post('/shop', userAuth, usersController.shop);
router.post('/deleteFromCart', userAuth, usersController.deleteFromCart);
router.get('/buy-detail/:id', userAuth, usersController.showBuyDetail);

module.exports = router;