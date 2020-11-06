 let productsList = require('../data/products.json');


 let productsController = {
     create: function (req, res, next) {
         res.render('products/productCreate')
     },

     /*store: function (req, res) {
         res.redirect('products/productDetail')
     },*/

     edit: function (req, res, next) {
         res.render('products/productEdit')
     },

     list: function (req, res) {
         res.render('products/productsList', {
             productsList: productsList
         });
     },


     detail: function (req, res) {
         res.render('products/productDetail')
     },

     cart: function (req, res) {
         res.render('products/productCart')
     }

 }


 module.exports = productsController;