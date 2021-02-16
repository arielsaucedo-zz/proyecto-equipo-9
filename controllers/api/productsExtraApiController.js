let db = require('../../database/models')

const controller = {
    showAllExtra: function (req, res) {
        db.Products.findAll({
            include: [{association: "Category", attributes: ["name"]}],
            attributes: ['id', 'name', 'description', 'created_at', 'updated_at', 'quantity', 'discount', 'image']
        })
			.then(function(productsList){
            let allProducts = productsList
            
            for (let i= 0; i < allProducts.length; i++){
                allProducts[i].setDataValue("detail", "/api/products/" + allProducts[i].id)
            }

            let respuesta = {
                meta: {
                    status: 200,
                    total: allProducts.length,
                },
                data: allProducts,
              }
            
            res.json(respuesta)
        })
			.catch(e => console.log(e));
    },

    lastProductDB: function (req, res) {
        db.Products.findOne({
                order: [['created_at', 'DESC']],
                limit: 1,
                attributes: {exclude: ["CategoryId"]},
                include: [{association: "Category", attributes: ["name"]}]
        })
        .then(function(resultado){
            let product = resultado
            console.log(product.created_at)
            product.setDataValue("image", "http://localhost:3000/images/products/" + resultado.image)
            product.setDataValue("detail", "/api/products/" + resultado.id)
            let respuesta = {
                meta: {
                    status: 200,
                },
                data: product,
              }
            res.json(respuesta)
        })
        .catch(e => console.log(e))
    },
}

module.exports = controller;