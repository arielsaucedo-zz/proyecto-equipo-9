module.exports = (sequelize, DataTypes) => {
    let alias = "CartDetail"
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
        shoppingCartId: {
            allowNull: false,
            type: DataTypes.INTEGER
        },
        productsId: {
            allowNull: false,
            type: DataTypes.INTEGER
        },
    }
    let config = {
        tableName: "cart_details"
    }

    const CartDetail = sequelize.define(alias, cols, config);
    /*
    CartDetail.associate = function(models) {
        CartDetail.belongsTo(models.ShoppingCart, {
            as: "shopping_cart",
            foreingKey: "shopping_cart_id"
        })
        
        CartDetail.hasMany(models.Product, {
            as: "products",
            foreingKey: "products_id"
        })
    }
    
    */
    return CartDetail;
}