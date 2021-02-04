let bcryptjs = require('bcryptjs')
let db = require('../database/models')

const {
    check,
    validationResult,
} = require('express-validator')

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
       
        db.Users.create({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            user_name: req.body.user_name,
            password: bcryptjs.hashSync(req.body.password_confirmation),
            role_id: 2,
            image_avatar: filenameVal
        })
        .catch(function(error){
            console.log(error)
            res.send('')
        })
        res.render('users/addedUser')
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

        db.Users.update(
            {
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                user_name: req.body.user_name,
                role_id: 1,
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
        res.render('users/changeUser')
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
            const _body = req.body
            _body.password = bcryptjs.hashSync(req.body.password_new)
            db.Users.update(
                {
                    password : _body.password
                },
                { 
                    where : { id : req.params.id } 
                })
            res.redirect(`${req.params.id}/edit`)
        })
    },

    /**
User.findAll({
  include: [{
    model: Project,
    through: {
      attributes: ['createdAt', 'startedAt', 'finishedAt'],
      where: {completed: true}
    }
  }]
});
     */
    cart(req, res) {
        db.ShoppingCarts.findOne({
          where: {
            user_id: req.session.userId,
          },
          include : [{
            model : db.Products,
            as: 'products',
            }],
        }).then((ShoppingCart) => {
            console.log(ShoppingCart);
            return res.render("users/cart", { ShoppingCart : ShoppingCart })
        });
    },

    addToCart(req, res) {
        const errors = validationResult(req);
    
        if (errors.isEmpty()) {
            // Busco si el usuario tiene un carrito.
            db.ShoppingCarts.findOne({
                where : {
                    user_id : req.session.userId
                }
            }).then(cart => {
                //el metodo siguiente lo que hace es insertar los datos del producto seleccionado
                //para ser agregado al carrito en la tabla pivot (cart_details) mediante la asociación
                //con Productos.
                if(cart){
                    cart.addProducts(req.params.id, {
                        through : { quantity: 1, subtotal : 100 }
                    })
                    .then(resultado => console.log(resultado))
                    .catch((e) => console.log(e));
                } else {
                    db.ShoppingCarts.create({
                        total: 0,
                        user_id: req.session.userId,
                        CartItems: [],
                    })
                    .then(cart => 
                        cart.addProducts(req.params.id, {
                            through : { quantity: 1, subtotal : 100 }
                        })
                        .then(resultado => console.log(resultado))
                        .catch((e) => console.log(e))
                    )
                    .catch((e) => console.log(e));
                }

            })
            .catch((e) => console.log(e));
/* 
            // Busco el producto que voy a agregar como Item.
            db.Products.findByPk(req.params.id, )
            .then((product) => {
              // Saco el valor del producto, teniendo en cuenta el descuento.   
                let price =
                    Number(product.discount) > 0
                    ? product.price - (product.price * product.discount) / 100
                    : product.price;
              // Creo el Item de compra
                return db.ShoppingCarts.create({
                    total: 1000,
                    user_id: req.session.id,
                    CartItems: [{
                    quantity: req.body.product_quantity,
                    subtotal: price * req.body.product_quantity,
                    product_id: product.id,
                    }]
                }, {
                    include : [{
                        association : db.CartDetails,
                        as : 'CartItems'
                    }]
                })
            })
            .then((item) => res.redirect("/users/cart"))
            .catch((e) => console.log(e));
        } else {
            db.Products.findByPk(req.params.id)
             .then(product => {
                return res.render('products/detail', {product, errors: errors.mapped()})
            })
        */
        } 
        
    },

    deleteFromCart(req, res) {
    Item.destroy({
        where: {
        id: req.body.itemId,
        },
        force: true,
    })
        .then((response) => res.redirect("/users/cart"))
        .catch((e) => console.log(e));
    },

    shop(req, res) {
    let items;

    // busco los items agregados al carrito
    Item.findAll({
        where: {
        userId: req.session.userId,
        state: 1,
        },
    })
        // cierro los items
        .then((itemsSearched) => {
        items = itemsSearched;
        return Item.closeItems(req.session.userId);
        })
        // busco el ultimo carrito creado
        .then(() => {
        return Cart.findOne({
            order: [["createdAt", "DESC"]],
        });
        })
        // creo el nuevo carrito
        .then((cart) => {
        return Cart.create({
            orderNumber: cart ? ++cart.orderNumber : 1000,
            total: items.reduce(
            (total, item) => (total = total + item.subTotal),
            0
            ),
            userId: req.session.userId,
        });
        })
        // les asigno el id del carrito nuevo a los items no asignados
        .then((cart) => {
        return Item.assignItems(req.session.userId, cart.id);
        })
        // redirect
        .then(() => res.redirect("/users/history"))
        .catch((e) => console.log(e));
    },
/* 
    history(req, res) {
    Cart.findAll({
        where: {
        userId: req.session.userId,
        },
        include: {
        all: true,
        nested: true,
        paranoid: false,
        },
        order: [["createdAt", "DESC"]],
    })
        .then((carts) => {
        res.render("users/history", { carts });
        })
        .catch((e) => console.log(e));
    },
 */
    showBuyDetail(req, res) {
    Cart.findByPk(req.params.id, {
        include: {
        all: true,
        nested: true,
        paranoid: false,
        },
    }).then((cart) => res.render("users/buyDetail", { cart }));
    },
}

module.exports = controller;