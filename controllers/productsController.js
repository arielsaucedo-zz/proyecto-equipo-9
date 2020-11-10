 const products = require('../data/products.json');


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
         /*  let resultado = categories.find(function (category) {
               return category.id == req.params.id
           })*/
     },

     create: function (req, res, next) {
         res.render('products/productCreate')
     },

     store: function (req, res) {
         products.push({
             ...req.body,
             id: products[products.length - 1].id + 1
         })
         fs.writeFileSync(productsFilePath, JSON.stringify(products))

         res.render('products/added')
     },

     edit: function (req, res, ) {
         let toEdit = req.params.id
         res.render('products/productEdit', {
             toEdit: toEdit
         })
     },

     update: function (req, res, next) {
         res.render('')
     },

     destroy: function (req, res) {
         console.log('El producto ' + req.params.id + ' fue eliminado exitosamente!')
         res.redirect('/')

     },

     detail: function (req, res) {
         res.render('products/productDetail')
     },

     cart: function (req, res) {
         res.render('products/productCart')
     }

 }


 module.exports = productsController;