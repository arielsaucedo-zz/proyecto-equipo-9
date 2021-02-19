let db = require('../../database/models')
let Sequelize = require('sequelize')
const Op = Sequelize.Op

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

    soldProducts: function(req, res) {
        let soldProducts = db.CartDetails.findAll({
                    attributes: ['id', 'quantity', 'subtotal'],
                })

        let totalSales = db.ShoppingCarts.sum('total', { where: { order_number: { [Op.ne]: null } } })

        Promise.all([soldProducts, totalSales])
        .then(function([soldProducts, totalSales]){
            
            let products = 0
            soldProducts.forEach(item => {
                products = products + item.quantity
            })
            
            let sales = totalSales

            let respuesta = {
                meta: {
                    status: 200,
                },
                data: {
                    soldProductos: products,
                    totalSales: sales,
                }
            }
            res.json(respuesta)
        })
        .catch(e => console.log(e))

    },
    lastFiveSales: function (req, res, next){
        db.sequelize.query(`select product_id, count(*) * cartI.quantity as Sold_Quantity, prod.name, prod.description, prod.price, prod.created_at
            from shopping_carts as cartH inner JOIN cart_details as cartI ON cartI.shopping_cart_id = cartH.id 
            inner join products as prod on cartI.product_id = prod.id
            where order_number is not null
            group by product_id
            order by Sold_Quantity desc
            limit 5`, 
            { type: db.sequelize.QueryTypes.SELECT})  
        .then(query => {
            let respuesta = {
                meta: {
                    status: 200,
                },
                data: {
                    products: query
                }
            }
            res.json(respuesta)
        })
        .catch(e => console.log(e))
    }
}

module.exports = controller;