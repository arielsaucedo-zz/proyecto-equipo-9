module.exports = (sequelize, DataTypes) => {
    let alias = "ShoppingCarts"
    let cols = {
        id: {
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
            type: DataTypes.INTEGER,
        },
        total: {
            allowNull: false,
            type: DataTypes.DECIMAL(10, 2)
        },
        created_at: {
            type: DataTypes.DATE
        },
        updated_at: {
            type: DataTypes.DATE
        },
        user_id: {
            allowNull: false,
            type: DataTypes.INTEGER
        }
    }
    let config = {
        tableName: "shopping_carts",
        timestamps: false,
        underscored: true
    }


    const shoppingCart = sequelize.define(alias, cols, config);
    
    shoppingCart.associate = function(models) {
        shoppingCart.belongsTo(models.Users, {
            as: "user",
            foreingKey: "user_id"
        })
/*
        shoppingCart.hasMany(models.CartDetail, {
            as: "cart_details",
            foreingKey: "shopping_cart_id"
        })
*/
    }

    return shoppingCart;
}