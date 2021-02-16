let db = require('../../database/models')

const controller = {
    showAllExtra: function (req, res) {
        db.Users.findAll({
            include: [{association: "Role", attributes: ["name"]}],
            attributes: ['id', 'first_name', 'last_name', 'user_name', 'created_at', 'updated_at', 'image_avatar']
        })
			.then(function(usersList){
            let allUsers = usersList
            
            for (let i= 0; i < allUsers.length; i++){
                allUsers[i].setDataValue("detail", "/api/users/" + allUsers[i].id)
            }

            let respuesta = {
                meta: {
                    status: 200,
                    total: allUsers.length,
                },
                data: allUsers,
              }
            
            res.json(respuesta)
        })
			.catch(e => console.log(e));
    },

    lastUserDB: function (req, res) {
        db.Users.findOne({
                order: [['created_at', 'DESC']],
                limit: 1,
                attributes: {exclude: ["RoleId"]},
                include: [{association: "Role", attributes: ["name"]}]
        })
        .then(function(resultado){
            let user = resultado
            user.setDataValue("image", "http://localhost:3000/images/uploads_users/" + resultado.image_avatar)
            user.setDataValue("detail", "/api/users/" + resultado.id)
            let respuesta = {
                meta: {
                    status: 200,
                },
                data: user,
              }
            res.json(respuesta)
        })
        .catch(e => console.log(e))
    },
}

module.exports = controller;