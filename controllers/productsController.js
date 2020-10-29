module.exports = {
    create: function (req, res, next) {
        res.render('products/newProduct')
    },

    /*store: function (req, res) {
        res.redirect('products/productDetail')
    },*/

    edit: function (req, res, next) {
        res.render('products/editProduct')
    },

    list: function (req, res) {
        res.render('products/productList')
    },


    detail: function (req, res) {
        res.render('products/productDetail')
    }

}