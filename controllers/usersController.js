let bcryptjs = require('bcryptjs')
let db = require('../database/models')
let Sequelize = require('sequelize')
const Op = Sequelize.Op;

const {
    check,
    validationResult,
} = require('express-validator');
const { sequelize } = require('../database/models');

function dateNow() {
    let now = new Date()
    let monthReal = now.getMonth() + 1
    return (now.getFullYear() + '-' + monthReal + '-' + now.getDate() + ' ' + now.getHours() + ':' + now.getMinutes() + ':' + now.getSeconds())
}

const controller = {
    login: function (req, res) {
        res.render('users/login', {
            errors: []
        })
    },

    processLogin: function (req, res) {
        let errors = validationResult(req)

        db.Users.findOne({
                where: {
                    user_name: req.body.user_name
                }
            })
        .then((resultado) => {
            if (errors.isEmpty()) {
                let userLoggedIn = resultado
                if (!userLoggedIn) {
                    return res.render('users/login', {
                        errors: [{
                            value: '',
                            msg: 'E-mail incorrecto. Ingrese nuevamente los datos por favor.',
                            param: 'user_name',
                            location: 'body'
                        }]
                    })
                } else if (bcryptjs.compareSync(req.body.password, userLoggedIn.password)) {
                    req.session.user = userLoggedIn.user_name
                    req.session.first_name = userLoggedIn.first_name
                    req.session.last_name = userLoggedIn.last_name
                    req.session.userId = userLoggedIn.id
                    req.session.image_avatar = userLoggedIn.image_avatar
                    req.session.role_id = userLoggedIn.role_id
                    if (req.body.rememberMe) {
                        res.cookie('rememberMe', userLoggedIn.user_name, {
                            maxAge: 120 * 1000
                        })
                    }
                    return res.redirect('/')
                } else {
                    return res.render('users/login', {
                        errors: [{
                            value: '',
                            msg: 'Contraseña incorrecta. Ingrese nuevamente los datos por favor.',
                            param: 'password',
                            location: 'body'
                        }]
                    })
                }
            } else {
                return res.render('users/login', {
                    errors: errors.errors
                })
            }
        })
        .catch(function(error){
            console.log(error)
            res.send('')
        })
    },

    logout: function (req, res) {
        req.session.destroy()
        res.locals.user = '' // se limpia valor de res.locals.user debido a que era necesario re-ejecutar logout para anular valor de res.locals.user.
        res.cookie('rememberMe', null, {
            maxAge: 0
        })
        return res.render('users/login', {
            errors: []
        })
    },

    register: function (req, res) {
        res.render('users/register', {
            errors: []
        })
    },

    store: function (req, res, next) {
        let errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.render('users/register', {
                errors: errors.errors
            });
        }

        let filenameVal = 'avatar-default.jpg'
        if (req.files[0] != undefined && req.files[0] != filenameVal  ) {
            filenameVal = req.files[0].filename
        }
        let dateTimeBD = dateNow()
        db.Users.create({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            user_name: req.body.user_name,
            created_at: dateTimeBD,
            updated_at: dateTimeBD,
            password: bcryptjs.hashSync(req.body.password_confirmation),
            role_id: 1,
            image_avatar: filenameVal
        })
        .catch(function(error){
            console.log(error)
            res.send('')
        })
        res.render("users/addedUser")
    },

    show: function (req, res, next) {
        let user = {}
        db.Users.findOne({
                where: {
                    user_name: res.locals.user
                }
        })
        .then((resultado) => {
            user = resultado
            res.render('users/userDetail', {
                userLoggedIn: user,
                errors: []
            })
        })
        .catch(function(error){
            console.log(error)
            res.send('')
        })
    },

    update: function (req, res, next) {
        let errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.render('users/userDetail', {
                errors: errors.errors
            });
        }

        let filenameVal = 'avatar-default.jpg'
        if (req.files[0] != undefined && req.files[0] != filenameVal  ) {
            filenameVal = req.files[0].filename
        }
        let dateTimeBD = dateNow()
        db.Users.update(
            {
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                user_name: req.body.user_name,
                updated_at: dateTimeBD,
                image_avatar: filenameVal
            }, 
            { 
                where : {id : req.params.id}
            }
        )
        .catch(function(error){
            console.log(error)
            res.send('')
        })
        res.send('')
    },

    showChangePassword: function(req, res, next) {
        let user = {}
        db.Users.findOne({
                where: {
                    user_name: res.locals.user
                }
        })
        .then((resultado) => {
            user = resultado
            res.render('users/changePassword', {
                userLoggedIn: user,
                errors: []
            })
        })
        .catch(function(error){
            console.log(error)
            res.send('')
        })
    },

    updateChangePassword: function(req, res, next) {
        let errors = validationResult(req)
        console.log(errors);
        db.Users.findOne({
            where: {
                id: req.params.id
            }
        })
        .then((resultado) => {
            let userLoggedIn  = resultado
            if (!errors.isEmpty()) {
                return res.render('users/changePassword', {
                    userLoggedIn : userLoggedIn,
                    errors: errors.errors
                })
            }
            let dateTimeBD = dateNow()
            const _body = req.body
            _body.password = bcryptjs.hashSync(req.body.password_new)
            db.Users.update(
                {
                    password : _body.password,
                    updated_at : dateTimeBD,

                },
                { 
                    where : { id : req.params.id } 
                })
            res.redirect(`${req.params.id}/edit`)
        })
    },

    cart: function(req, res, next) {
        db.ShoppingCarts.findOne({
          where: {
            user_id: req.session.userId,
            order_number: null,
          },
          include : [{
            model : db.Products,
            as: "products",     
            through : {
                attributes: ['id', 'quantity', 'subtotal', 'shopping_cart_id', 'product_id'],
            }
            }],
        }).then((ShoppingCart) => {
            return res.render("users/cart", { ShoppingCart : ShoppingCart })
        });
    },

    addToCart: function(req, res, next) {
        const errors = validationResult(req)
        const _body = req.body
        if (errors.isEmpty()) {
            // Busco producto que voy a agregar al carrito de compras.
            let productToAdd = db.Products.findByPk(req.params.id)
            // Busco si existe un carrito para el usuario logueado.
            let shopCartToAdd = db.ShoppingCarts.findOne({
                where : {
                    user_id : req.session.userId,
                    order_number: null,
                }
            })
            Promise.all([productToAdd, shopCartToAdd])
                .then(([productToAdd, shopCartToAdd]) => {
                    //el metodo siguiente lo que hace es insertar los datos del producto seleccionado
                    //para ser agregado al carrito en la tabla pivot (cart_details) mediante la asociación
                    //con Productos.

                    // Con este IF se carga cantidad cuando el addToCart es desde el index.
                    if (!_body.product_quantity) {
                        _body.product_quantity = 1
                    }
                    if(shopCartToAdd){
                        shopCartToAdd.addProducts(productToAdd.id, {
                            through : { 
                                quantity: _body.product_quantity,
                                subtotal : _body.product_quantity * productToAdd.price ,
                            }
                        })
                        .then(resultado => {
                            res.redirect("/users/cart")
                        })
                        .catch((e) => console.log(e))
                    } else {
                        let dateTimeBD = dateNow()
                        db.ShoppingCarts.create({
                            created_at : dateTimeBD,
                            updated_at : dateTimeBD,
                            total: 0,
                            user_id: req.session.userId,
                            products: [],
                        })
                        .then(cart => {
                            cart.addProducts(productToAdd.id, {
                                through : { 
                                    quantity: _body.product_quantity, 
                                    subtotal : _body.product_quantity * productToAdd.price ,
                                }
                            })
                            .then(resultado => {
                                res.redirect("/users/cart")
                            })
                            .catch((e) => console.log(e))
                        })
                        .catch((e) => console.log(e))
                    }
                })
                .catch((e) => console.log(e))
        } else {
            return res.render('/users/cart', {
                errors: errors.errors
            })
        }
    },

    deleteFromCart: function(req, res, next) {
        db.CartDetails.destroy({
            where: {
                id: req.params.id,
            },
            force: true,
        })
        .then((response) => res.redirect("/users/cart"))
        .catch((e) => console.log(e))
    },

    editQtyItemCart: function(req, res, next){
        console.log(req.body)
        db.CartDetails.update(
            {
                quantity: req.body.quantity,
                subtotal : req.body.quantity * req.body.price,
            }, 
            { 
                where : {
                    id: req.params.id,
                }
            }
        )
        .then((response) => res.redirect("/users/cart"))
        .catch((e) => console.log(e))
    },

    shop: function(req, res) {
        let lastCartFinished = db.ShoppingCarts.findAll({
            where : {
                user_id : req.session.userId,
                order_number: {
                    [Op.ne]: null
                  }
            },
            order: [['order_number', 'DESC']],
            limit: 1,
        })
        let cartToFinish = db.ShoppingCarts.findOne({
            where : {
                user_id : req.session.userId,
                order_number: null,
            },
            include : [{
                model : db.Products,
                as: "products",     
                through : {
                    attributes: ['id', 'quantity', 'subtotal', 'shopping_cart_id', 'product_id'],
                }
            }],
        })
        Promise.all([lastCartFinished, cartToFinish])
            .then(([lastCartFinished, cartToFinish]) => {
                let total = 0
                cartToFinish.products.forEach(item => {
                    let aux = 0
                    aux = parseFloat(item.CartDetails.subtotal)
                    total = aux + total
                })
                let auxOrderNumber = 0
                if(lastCartFinished){
                    auxOrderNumber = parseFloat(lastCartFinished[0].order_number || 0)
                }
                let nextOrderNumber = auxOrderNumber + 1
                cartToFinish.update({
                    order_number : nextOrderNumber,
                    total : total,
                    updated_at : dateTimeBD,
                })
                .then((updatedCart) => {
                    let dateTimeBD = dateNow()
                    db.ShoppingCarts.create({
                        created_at : dateTimeBD,
                        updated_at : dateTimeBD,
                        total: 0,
                        user_id: req.session.userId,
                        products: [],
                    })
                    .then(cart => {
                            res.redirect('/users/history')
                    })
                    .catch((e) => console.log(e))
                })
                .catch((e) => console.log(e))
            })
            .catch((e) => console.log(e))
    },

    history: function(req, res, next) {
        db.ShoppingCarts.findAll({
            where : {
                user_id : req.session.userId,
            },
            include : [{
                model : db.Products,
                as: "products",     
                through : {
                    attributes: ['id', 'quantity', 'subtotal', 'shopping_cart_id', 'product_id'],
                }
            }],
        })
        .then((carts) => {
            res.render('users/history', { carts : carts })
        })
        .catch((e) => console.log(e))
    },

    showBuyDetail: function(req, res) {
        db.ShoppingCarts.findByPk(req.params.id, {
            include: {
            all: true,
            nested: true,
            paranoid: false,
            },
        }).then((cart) => {
            res.render("users/buyDetail", { cart })
        }) 
        .catch((e) => console.log(e))
    },
}

module.exports = controller;