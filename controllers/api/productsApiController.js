let db = require('../../database/models')

const controller = {
    showAll: function (req, res) {
        const productsList = db.Products.findAll({
            include: [{association: "Category", attributes: ["name"]}],
            attributes: ['id', 'name', 'description']
        })
		const categoriesList = db.Categories.findAll({
            include: [{association: "products"}]
        });

		Promise.all([productsList, categoriesList])
			.then(function([productsList, categoriesList]){

            let allProducts = productsList
            let allCategories = categoriesList
            let arrayCategories = []
               
            for (let i= 0; i < allProducts.length; i++){
                allProducts[i].setDataValue("detail", "/api/products/" + allProducts[i].id)
            }

            allCategories.forEach(category => {
                let objCategory = {
                    name: category.name,
                    productCount: category.products.length
                }
                arrayCategories.push(objCategory)
            });

            let respuesta = {
                meta: {
                    status: 200,
                    count: allProducts.length,
                    countByCategory: arrayCategories
                },
                data: allProducts,
              }
            
            res.json(respuesta)
        })
			.catch(e => console.log(e));
    },
    
    find: function (req, res) {
        db.Products.findOne({
                where: {
                    id: req.params.id
                },
                attributes: {exclude: ["CategoryId"]},
                include: [{association: "Category", attributes: ["name"]}]
        })
        .then(function(resultado){
            let product = resultado
            product.setDataValue("image", "http://localhost:3000/images/uploads_users/" + resultado.image)

            let respuesta = {
                meta: {
                    status: 200,
                },
                data: product,
              }
            res.json(respuesta)
        })   
    }
}

module.exports = controller;