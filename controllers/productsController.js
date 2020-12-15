const products = require('../data/products.json');
const fs = require('fs')
const path = require('path')
const {check, validationResult, } = require('express-validator')
const productsFilePath = path.join(__dirname, '../data/products.json')
const productDataFilePath = path.join(__dirname, '../data/product')
let productData = require(productDataFilePath)
let db = require('../database/models')

let productsController = {

    list: function (req, res) {
        res.render('products/list', { products: products });
    },

    show: function (req, res) {
        let product = []
        product = products.filter(function (productElement) {
            if (productElement.id == req.params.id) {
                return true
            }
        })
        res.render('products/productDetail', { productDetail: product[0] })
    },

    create: function (req, res, next) {
        db.Category.findAll()
        .then(function(categories){
            res.render('products/productCreate', { errors : [] }, { categories:categories });
        })
    },

    store: function (req, res) {
        let errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.render('products/productCreate', { errors: errors.errors } );
        }
        db.Product.create({
                id: products[products.length - 1].id + 1,
                name: req.body.product_name,
                description: req.body.product_description,
                created_at: newDate(),
                updated_at: newDate(),
                quantity: req.body.product_quantity,
                price: req.body.product_price,
                image: req.body.image,
                category: req.body.product_category, 
        })
        res.render('products/added')
    },
        /* products.push(
            {
                id: products[products.length - 1].id + 1,
                name: req.body.product_name,
                detail: req.body.product_description,
                price: req.body.product_price,
                category: req.body.product_category,
                quantity: req.body.product_quantity,
                image: "/images/Net-4.jpg" // aca hay que meter la imagen posta (capaz sea necesario hacer una vista aparte)
            },
        )
        fs.writeFileSync(productsFilePath, JSON.stringify(products))
        res.render('products/added')
    }, */

    edit: function (req, res, next) {
        let product = []
        product = products.filter(function (productElement) {
            if (productElement.id == req.params.id) {
                return true
            }
        })
        res.render('products/productEdit', { productEdit: product[0], errors : [] }) 
    },

    update: function (req, res, next) {
        let errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.render('products/productEdit', { errors: errors.errors });
        }
        let productEdited = {}
        productEdited = products.map(function (productElement) {
            if (productElement.id == req.params.id) {
                productElement.name = req.body.name
                productElement.category = req.body.category
                productElement.detail = req.body.detail
                productElement.price = req.body.price
                productElement.quantity = req.body.quantity
                productElement.image = req.body.image
            }
            return productElement
        })

        productEdited = JSON.stringify(productEdited)
        fs.writeFileSync(productsFilePath, productEdited)
        res.redirect('..')
    },

    destroy: function (req, res) {
        let productsRemaining = []
        productsRemaining = products.filter(function(productElement){
            if(productElement.id != req.params.id){return true}else{return false}
        })
        productsRemaining = JSON.stringify(productsRemaining)
        fs.writeFileSync(productsFilePath, productsRemaining)
        console.log('El producto ' + req.params.id + ' fue eliminado exitosamente!')
        res.redirect('/')
    },

    cart: function (req, res) {
        db.ShoppingCart.findAll({include: [{ association : 'Users' }]})
            .then(Shopping_cart => {console.log('ShoppingCart.findAll')
            })
/*
        db.CartDetail.findAll()
            .then(CartDetail => {console.log("CartDetail.findAll")
            })
*/
        res.render('products/productCart', { errors : [] })
    }

}


 module.exports = productsController;