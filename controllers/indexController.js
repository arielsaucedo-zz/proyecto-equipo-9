const path = require('path')
const productDataFilePath = path.join(__dirname, '../data/product')
let productData = require(productDataFilePath)
let db = require('../database/models')

const products = require('../data/products.json');

module.exports = {

    index: function (req, res, next) {
        db.Products.findAll()
        .then((resultado) => {
            res.render('index', { products: resultado })
        })
        .catch(function(error){
            console.log(error)
            res.send('')
        })
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