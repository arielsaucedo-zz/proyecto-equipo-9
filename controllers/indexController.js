const path = require('path')
const productDataFilePath = path.join(__dirname, '../data/product')
let productData = require(productDataFilePath)

module.exports = {
    index: function (req, res, next) {
        res.render("index")
    },
}