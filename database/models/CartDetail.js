module.exports = (sequelize, DataTypes) => {
    let alias = "CartDetails"
    let cols = {
        id: {
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
            type: DataTypes.INTEGER,

        },
        quantity: {
            allowNull: false,
            type: DataTypes.INTEGER
        },
        subtotal: {
            allowNull: false,
            type: DataTypes.DECIMAL(10, 2)
        },
        shopping_cart_id: {
            allowNull: false,
            type: DataTypes.INTEGER
        },
        product_id: {
            allowNull: false,
            type: DataTypes.INTEGER
        },
    }

    let config = {
        tableName: "cart_details",
        timestamps: false,
        underscored: true
    }

    const CartDetail = sequelize.define(alias, cols, config)


    CartDetail.associate = function(models) {
        CartDetail.belongsTo(models.ShoppingCarts, {
            as: "ShoppingCart",
            foreingKey: "shopping_cart_id"
        })

        CartDetail.belongsTo(models.Products, {
            as: "Product",
            foreingKey: "product_id"
        })
    }
    return CartDetail
}