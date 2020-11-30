const path = require('path')
const productDataFilePath = path.join(__dirname, '../data/product')
let productData = require(productDataFilePath)

const products = require('../data/products.json');

module.exports = {
    index: function (req, res, next) {
        res.render("index", { products: products })
    },
    search: (req, res) => {
		res.render('results')
	},
}