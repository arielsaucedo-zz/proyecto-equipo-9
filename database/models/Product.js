module.exports = (sequelize, DataTypes) => {
    let alias = "Product"
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
        timestamps: false
    }

    const Product = sequelize.define(alias, cols, config);
    Product.associate = (models) => {
        Product.belongsTo(models.Categories, {
            as: "categories",
            foreingKey: "category_id",
        })
        /*
        Product.belongsTo(models.CartDetails, {
            as: "cart_details",
            foreingKey: "products_id"
        })
        */
    }
    return Product;
}