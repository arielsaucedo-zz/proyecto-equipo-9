module.exports = (sequelize, DataTypes) => {
    let alias = "Categories";
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
        created_at: {
            type: DataTypes.DATE
        },
        updated_at: {
            type: DataTypes.DATE
        }
    }
    let config = {
        tableName: "categories",
        timestamps: false,
        underscored: true
    }

    const Category = sequelize.define(alias, cols, config);
    Category.associate = function(models) {
        Category.hasMany(models.Product, {
            as: "product",
            foreingKey: "category_id"
        })
    }

    return Category
}