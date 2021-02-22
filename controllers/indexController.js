const path = require('path')
let db = require('../database/models')

module.exports = {

    index: function (req, res, next) {
        let lastProducts = db.Products.findAll({
            order: [['created_at', 'DESC']],
            limit: 4,
        })
        // Busco si existe un carrito para el usuario logueado.
        let cheaperProducts = db.Products.findAll({
            order: [['discount', 'DESC'], ['created_at', 'DESC']],
            limit: 4,
        })
        Promise.all([lastProducts, cheaperProducts])
            .then(([lastProducts, cheaperProducts]) => {
                res.render('index', { lastProducts : lastProducts, cheaperProducts : cheaperProducts })
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