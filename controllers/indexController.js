const path = require('path')
const productDataFilePath = path.join(__dirname, '../data/product')
let productData = require(productDataFilePath)

const products = require('../data/products.json');

module.exports = {
    index: function (req, res, next) {
        res.render("index", { products: products })
    },
    search: (req, res) => {
        let searchResults = []
        searchResults = products.filter(function (productElement) {
            if (productElement.name.includes(req.query.search)  ||
                productElement.detail.includes(req.query.search)  ||
                productElement.category.includes(req.query.search)) {
                return true
            } else { return false}
        })
		res.render('results', { products: searchResults })
	},
}