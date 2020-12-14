const { DataTypes } = require("sequelize/types");
const { sequelize } = require(".");

module.exports = (sequelize, DataTypes) => {
    let alias = "Roles"
    let cols = {
        id: {
            primaryKey: true,
            allowNull: false,
            type: DataTypes.INTEGER,

        },
        name: {
            allowNull: false,
            type: DataTypes.STRING
        },
    }
    let config = {
        tableName: "roles"
    }

    const Role = sequelize.define(alias, cols, config);

    Role.associate = function(models) {
        Role.hasMany(models.Users, {
            as: "users",
            foreingKey: "rolesId",
        })
    }

    return Role;
}