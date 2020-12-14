const { DataTypes } = require("sequelize/types");
const { sequelize } = require(".");

module.exports = (sequelize, DataTypes) => {
    let alias = "Users"
    let cols = {
        id: {
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
            type: DataTypes.INTEGER,

        },
        firstName: {
            allowNull: false,
            type: DataTypes.STRING
        },
        lastName: {
            allowNull: false,
            type:DataTypes.STRING
        },
        email: {
            type:DataTypes.STRING
        },
        password: {
            type: DataTypes.STRING
        },
        imageAvatar: {
            type: DataTypes.STRING
        },
        createdAt: {
            type: DataTypes.DATE
        },
        updatedAt: {
            type: DataTypes.DATE
        },
        rolesId: {
            allowNull: false,
            type: DataTypes.INTEGER
            
        },
    }
    let config = {
        tableName: "users"
    }

    const User = sequelize.define(alias, cols, config);
    User.associate = function(models) {
        User.belongsTo(models.Roles, {
            as: "roles",
            foreingKey: "rolesid",
        })

    return User;
}
}