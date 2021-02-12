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
        db.Products.findAll()
        .then((producto) => {
            
            searchResults = producto.filter(function (productElement) {

                let buscado = req.query.search.toLowerCase();

                let nombre = productElement.name.toLowerCase();

                let description = productElement.description.toLowerCase();

                if (nombre.includes(buscado) ||
                    description.includes(buscado) 
                //     || productElement.category.includes(req.query.search)
                ) {
                    return true
                } else {
                    return false
                }
            })
            res.render('results', {
                products: searchResults
            })
        })
        .catch(function(error){
            console.log(error)
            res.send('')
           
        })
        
    },

    aboutUs: function (req, res, next) {

        res.render('aboutUs')
    }

}