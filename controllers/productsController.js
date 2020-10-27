module.exports = {
    create: function (req, res, next) {
    res.render("products/newProduct")
},

    store : function(req, res){
    res.redirect('products/productDetail')
},

    edit: function (req, res, next) {
    res.render("products/editProduct")
},

    store : function(req, res){
    res.redirect('products/productDetail')
},

}