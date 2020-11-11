 const products = require('../data/products.json');
 const fs = require('fs')
 const path = require('path')
 const {check, validationResult, } = require('express-validator')
 const productsFilePath = path.join(__dirname, '../data/products.json')

 let productsController = {

     list: function (req, res) {
         /*    let data = [...products]

             if (req.query.price_min) {
                 data = data.filter(function (product) {
                     return product.price >= req.query.price_min
                 })
             }

             if (req.query.name) {
                 data = data.filter(function (product) {
                     return product.name.includes(req.query.name);
                 })
             }*/

         res.render('products/list', {
             products: products
         });
     },

     show: function (req, res) {
        let product = []
        product = products.filter(function(productElement){
            if(productElement.id == req.params.id){
                return true
            }
        })
        res.render('products/productDetail', { productDetail : product[0] })
     },

     create: function (req, res, next) {
         res.render('products/productCreate')
     },

     store: function (req, res) {
         products.push(
//             {
//             ...req.body,
//             id: products[products.length - 1].id + 1
//         }
         {
            id: products[products.length - 1].id + 1,
            name: req.body.product_name,
            detail: req.body.product_description,
            price: req.body.product_price,
            category: req.body.product_category,
            image: "/images/Net-4.jpg" // aca hay que meter la imagen posta (capaz sea necesario hacer una vista aparte)
          },
         )
         fs.writeFileSync(productsFilePath, JSON.stringify(products))

         res.render('products/added')
     },

     edit: function (req, res, ) {
        let product = []
        product = products.filter(function(productElement){
            if(productElement.id == req.params.id){
                return true
            }
        })
        res.render('products/productEdit', { productEdit : product[0] })
     },

     update: function (req, res, next) {
        let errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.render('products/productEdit', { errors: errors.errors } );
        }
        let productEdited = {}
        productEdited = products.map(function(productElement){
            if(productElement.id == req.params.id){
                productElement.name = req.body.name
                productElement.category = req.body.category
                productElement.detail = req.body.detail
                productElement.price = req.body.price
                productElement.image = req.body.image
            }
            return productElement
        })
        
        productEdited = JSON.stringify(productEdited)
        fs.writeFileSync(productsFilePath, productEdited)
        res.redirect('..')
     },

     destroy: function (req, res) {
         console.log('El producto ' + req.params.id + ' fue eliminado exitosamente!')
         res.redirect('/')

     },

     cart: function (req, res) {
         res.render('products/productCart')
     }

 }


 module.exports = productsController;