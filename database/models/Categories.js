const {
    DataTypes
} = require("sequelize/types");
const {
    sequelize
} = require(".");
const Products = require("./Products");

module.exports = (sequelize, dataTypeslet) => {
    let alias = "Category";

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
        created_at: {
            type: dataTypes.DATE
        },
        updated_at: {
            type: dataTypes.DATE
        }
    }
    let config = {
        tableName: "categories",
        timestamps: false
    }

    const Category = sequelize.define(alias, cols, config);
    Category.associate = (models) => {
        Category.hasMany(models, Products, {
            as: "categories",
            fireingKey: "category_id"
        });

    }

    return Category;
}