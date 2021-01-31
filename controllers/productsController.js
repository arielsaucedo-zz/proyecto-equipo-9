const {
    check,
    validationResult,
} = require('express-validator')

let db = require('../database/models')

function dateNow() {
    let now = new Date()
    let monthReal = now.getMonth() + 1
    return (now.getFullYear() + '-' + monthReal + '-' + now.getDate() + ' ' + now.getHours() + ':' + now.getMinutes() + ':' + now.getSeconds())
}


let productsController = {

    async categories (req, res) {
		let where = {}
		let products = []
        let title = "Todos los productos"
        
		if (req.params.category) {
			let category = await db.Categories.findOne({
				where: {
				   name: req.params.category
				},
				include: ['products']
            });
            
            title = 'Todos los productos de la categoría: ' + category.name;			 
            
			if (category) {
				products = category.products
			};
		} else {
			products = await db.Products.findAll(where)
        }
        
        let categories = await db.Categories.findAll({
			include: ['products']
		});

		return res.render('products/categories', { products, categories, title })
	},

    show: function (req, res) {
        db.Products.findByPk(req.params.id)
        .then((resultado) => {
            res.render('products/productDetail', { productDetail: resultado })
        })
        .catch(function(error){
            console.log(error)
            res.send('')
        })
    },

    create: function (req, res, next) {
        db.Categories.findAll()
            .then(function (categories) {
                res.render('products/productCreate', {
                    errors: [],
                    categories: categories
                });
            })
            .catch(function (error) {
                console.log(error)
                res.send('')
            })
    },

    store: function (req, res) {
        let errors = validationResult(req)
        if (!errors.isEmpty()) {
            db.Categories.findAll()
                .then(function (categories) {
                    return res.render('products/productCreate', {
                        errors: errors.errors,
                        categories: categories
                    })
                })
                .catch(function (error) {
                    console.log(error)
                    res.send('')
                })
        } else {
            let dateTimeBD = dateNow()
            let filenameVal = 'product-default.jpg'
            if (req.files[0] != undefined && req.files[0] != filenameVal) {
                filenameVal = req.files[0].filename
            }
            db.Products.create({
                name: req.body.product_name,
                description: req.body.product_description,
                created_at: dateTimeBD,
                updated_at: dateTimeBD,
                quantity: req.body.product_quantity,
                price: req.body.product_price,
                image: filenameVal,
                category_id: req.body.product_category,
            })
            .catch(function(error){
                console.log(error)
                res.send('')
            })
            res.render('products/addedProduct')
        }
    },

    edit: function (req, res, next) {
        let allCategories = db.Products.findAll()
        let oneProduct = db.Products.findByPk(req.params.id)
        Promise.all([allCategories, oneProduct])
        .then(function([allCategories, oneProduct]){
            res.render('products/productEdit', { allCategories : allCategories, productEdit: oneProduct , errors : [] })
        })
        .catch(function(error){
            console.log(error)
            res.send('')
        })
    },

    update: function (req, res, next) {
        console.log("este es my body")
        console.log(req.body);
        let dateTimeBD = dateNow()
        let filenameVal = req.body.file
        let allCategories = db.Products.findAll()
        let oneProduct = db.Products.findByPk(req.params.id)
        if (req.files[0] != undefined) {
            filenameVal = req.files[0].filename
        }
        let errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.render('products/productEdit', { allCategories : allCategories, productEdit: oneProduct , errors: errors.errors });
        }
        db.Products.update({
            name: req.body.product_name,
            description: req.body.product_description,
            created_at: dateTimeBD,
            updated_at: dateTimeBD,
            quantity: req.body.product_quantity,
            price: req.body.product_price,
            image: filenameVal,
            category_id: req.body.product_category
            },
            { where: { id: req.params.id } })
        .then((resultado) => {
            res.redirect('..')
        })
        .catch(function(error){
            console.log(error)
            res.send('')
        })
        res.render('products/changeProduct')
    },

    destroy: function (req, res) {
        db.Products.destroy({
            where: {
                id: req.params.id
            }
        })
        .then((resultado) => {
            console.log('El producto ' + req.params.id + ' fue eliminado exitosamente!')
            res.redirect('/')
        })
        .catch(function(error){
            console.log(error)
            res.send('')
        })
    },

    addToCart: function (req, res) {
        db.Products.findByPk(req.params.id)
            .then((resultado) => {
                let dateTimeBD = dateNow()
                db.ShoppingCarts.create({
                    total: (resultado.price * req.body.product_quantity), //ver aca como hacer que acumule lo que se está agregando.
                    created_at: dateTimeBD,
                    updated_at: dateTimeBD,
                    user_id: res.locals.userId,
                    CartItems: [{
                        quantity: req.body.product_quantity,
                        subtotal: resultado.price * req.body.product_quantity,
                        product_id: req.params.id,
                        cart_details: {
                            selfGranted: true
                        }
                    }]
                },{
                    include: {
                        all: true
/*                        model: db.Products,
                        as: 'products' */
                    }
                })               
                res.render('products/productCart', { errors : [] })
            })
            .catch(function(error){
                console.log(error)
                res.send('')
            })
    },

    cart: function (req, res) {
        /*

                db.Users.findAll({ include: [ { association : 'role' }]})
                    .then(Users => {console.log(Users)})
        */
        /*
                db.ShoppingCarts.findAll({include: [{ association : 'user' }]})
                    .then(ShoppingCarts => {console.log(ShoppingCarts)
                    })

                db.Categories.findAll()
                .then(Categories => { console.log(Categories)
                })
        */

        /*
                db.CartDetail.findAll()
                    .then(CartDetail => {console.log("CartDetail.findAll")
                    })
        */
        res.render('products/productCart', {
            errors: []
        })
    }

}


module.exports = productsController;