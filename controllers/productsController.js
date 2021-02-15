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
                discount: req.body.product_discount,
            })
            .then(function(resultado) {
                res.render('products/addedProduct')
            })
            .catch(function(error){
                console.log(error)
                res.send('')
            })
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
        let dateTimeBD = dateNow()
        db.Products.update({
            name: req.body.product_name,
            description: req.body.product_description,
            updated_at: dateTimeBD,
            quantity: req.body.product_quantity,
            price: req.body.product_price,
            image: filenameVal,
            category_id: req.body.product_category
            },
            { where: { id: req.params.id } })
        .then((resultado) => {
            res.render('products/changeProduct')
        })
        .catch(function(error){
            console.log(error)
            res.send('')
        })
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
}


module.exports = productsController;