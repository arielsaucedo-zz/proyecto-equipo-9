let db = require('../../database/models')

const controller = {
    showAll: function (req, res) {
        db.Users.findAll({
            attributes: ['id', 'first_name', 'last_name','user_name']
        })
        .then(function(resultado){
            let allUsers = resultado   

            for (let i= 0; i < resultado.length; i++){
                allUsers[i].setDataValue("detail", "/api/users/" + resultado[i].id)
            }

            let respuesta = {
                meta: {
                    status: 200,
                    count: allUsers.length,
                },

                data: {
                    users: allUsers
                }   
              }
            
            res.json(respuesta)
        })
    },
    find: function(req,res) {
        db.Users.findOne({
            where: {
                id: req.params.id
            },
            attributes: {exclude: ["password", "role_id", "RoleId" , 
        //    "createdAt", "updatedAt"
        ]},
        })
            .then(function(resultado) {
                let user = resultado
                user.setDataValue("image_avatar", "http://localhost:3000/images/uploads_users/" + resultado.image_avatar)

                let respuesta = {
                    meta: {
                        status: 200,
                    },
                    data: user,
                }
                res.json(respuesta)       
            })
    },

}

module.exports = controller;