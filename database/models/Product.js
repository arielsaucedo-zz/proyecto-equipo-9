module.exports = (sequelize, DataTypes) => {
    let alias = "Products"
    let cols = {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.STRING
        },
        created_at: {
            type: DataTypes.DATE
        },
        updated_at: {
            type: DataTypes.DATE
        },
        quantity: {
            type: DataTypes.INTEGER
        },
        price: {
            type: DataTypes.DOUBLE
        },
        image: {
            type: DataTypes
        },
        category_id: {
            type: DataTypes.INTEGER

        }
    }
    let config = {
        tableName: "products",
        timestamps: false,
        underscored: true
    }

    const Product = sequelize.define(alias, cols, config);
    Product.associate = (models) => {
        Product.belongsTo(models.Categories, {
            as: "Category",
            foreingKey: "category_id",
        })

        /*
        Product.belongsTo(models.CartDetails, {
            as: "CartDetail",
            foreingKey: "product_id",
            targetKey: "product_id"
        })
        */

        Product.belongsToMany(models.ShoppingCarts, {
            through: "cart_detail",
            as: "ShoppingCarts",
            foreignKey: "product_id",
        });
    }
    return Product;
}