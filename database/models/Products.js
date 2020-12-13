const {
    DataTypes
} = require("sequelize/types");
const {
    sequelize
} = require(".");

module.exports = (sequelize, dataTypeslet) => {
    let alias = "Product";

    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: dataTypes.STRING,
            allowNull: false
        },
        description: {
            type: dataTypes.STRING
        },
        created_at: {
            type: dataTypes.DATE
        },
        updated_at: {
            type: dataTypes.DATE
        },
        quantity: {
            type: dataTypes.INTEGER
        },
        price: {
            type: dataTypes.DOUBLE
        },
        image: {
            type: dataTypes
        },
        category_id: {
            type: dataTypes.INTEGER

        }
    }
    let config = {
        tableName: "products",
        timestamps: false
    }

    const Product = sequelize.define(alias, cols, config);
    Product.associate = (models) => {
        Product.hasMany(models.Category, {
            as: "categories",
            foreingKey: "categories_id",
        })
        Product.belongToMany(models, Detail, {
            as: "details",
            fireingKey: "products_id"
        });

    }

    return Product;
}