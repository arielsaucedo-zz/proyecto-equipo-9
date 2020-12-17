module.exports = (sequelize, DataTypes) => {
    let alias = "Users"
    let cols = {
        id: {
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
            type: DataTypes.INTEGER
        },
        first_name: {
            allowNull: false,
            type: DataTypes.STRING
        },
        last_name: {
            allowNull: false,
            type:DataTypes.STRING
        },
        email: {
            type:DataTypes.STRING
        },
        password: {
            type: DataTypes.STRING
        },
        image_avatar: {
            type: DataTypes.STRING
        },
        created_at: {
            type: DataTypes.DATE
        },
        updated_at: {
            type: DataTypes.DATE
        },
        role_id:{
            allowNull: false,
            type: DataTypes.INTEGER
        }
    }

    let config = {
        tableName: "users",
        timestamps: false,
        underscored: true
    }

    const User = sequelize.define(alias, cols, config)
    User.associate = function(models) {
        User.belongsTo(models.Roles, {
            as: "role",
            foreingKey: "role_id"
        })

        User.hasMany(models.ShoppingCarts, {
            as: "shoppingcart",
            foreingKey: "user_id",
            targetKey: "user_id"
        })
    }
    return User
}