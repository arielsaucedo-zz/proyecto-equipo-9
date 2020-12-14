module.exports = (sequelize, DataTypes) => {
    let alias = "ShoppingCart"
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
        users_id: {
            allowNull: false,
            type: DataTypes.INTEGER
        }
    }
    let config = {
        tableName: "shopping_cart",
        timestamps: false
    }


    const shoppingCart = sequelize.define(alias, cols, config);
    
    shoppingCart.associate = function(models) {
        shoppingCart.hasOne(models.Users, {
            as: "Users",
            foreingKey: "users_id"
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