module.exports = (sequelize, DataTypes) => {
    let alias = "Roles"
    let cols = {
        id: {
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
            type: DataTypes.INTEGER
        },
        name: {
            allowNull: false,
            type: DataTypes.STRING
        }
    }

    let config = {
        tableName: "roles",
        timestamps: false
    }

    const Role = sequelize.define(alias, cols, config)
    Role.associate = function(models) {
        Role.hasMany(models.Users, {
            as: "Users",
            foreingKey: "roles_id"
        })
    }
    return Role
}