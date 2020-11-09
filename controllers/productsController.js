 const products = require('../data/products.json');


 let productsController = {

     list: function (req, res) {
         let data = [...products]

         if (req.query.price_min) {
             data = data.filter(function (product) {
                 return product.price >= req.query.price_min
             })
         }

         if (req.query.name) {
             data = data.filter(function (product) {
                 return product.name.includes(req.query.name);
             })
         }

         res.render('products/list', {
             products: data
         });
     },

     show: function (req, res) {
         let resultado = categories.find(function (category) {
             return category.id == req.params.id
         })
     },

     create: function (req, res, next) {
         res.render('products/productCreate')
     },

     store: function (req, res) {
         res.redirect('products/productDetail')
     },

     edit: function (req, res, next) {
         res.render('products/productEdit')
     },

     update: function (req, res, next) {
         res.render('')
     },

     destroy: function (req, res) {

     },

     detail: function (req, res) {
         res.render('products/productDetail')
     },

     cart: function (req, res) {
         res.render('products/productCart')
     }

 }


 module.exports = productsController;