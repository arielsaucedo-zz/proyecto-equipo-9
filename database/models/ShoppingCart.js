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
        },
        order_number: {
            allowNull: true,
            type: DataTypes.INTEGER
        }
    }
    let config = {
        tableName: "shopping_carts",
        timestamps: false,
        underscored: true
    }


    const ShoppingCart = sequelize.define(alias, cols, config)
        ShoppingCart.associate = function(models) {
            ShoppingCart.belongsTo(models.Users, {
                as: "User",
                foreignKey: "user_id"
            })
        ShoppingCart.belongsToMany(models.Products, {
            through: models.CartDetails,
            as: 'products',
            foreignKey: 'shopping_cart_id',
            otherKey: 'product_id',
            timestamps: false
        })
    }

    return ShoppingCart;
}