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
        timestamps: false,
        underscored: true
    }

    const Role = sequelize.define(alias, cols, config)
    Role.associate = function(models) {
        Role.hasMany(models.Users, {
            as: "Users",
            foreingKey: "role_id",
            targetKey: "role_id"
        })
    }
    return Role
}