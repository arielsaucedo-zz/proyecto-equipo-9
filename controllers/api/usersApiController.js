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
        db.Users.findByPk(req.params.id)
            .then(function(respuesta) {
                let usuario = {
                    id: respuesta.id, 
                    first_name: respuesta.id, 
                    last_name:respuesta.last_name,
                    image_avatar: "http://localhost:3000/api/users/" + respuesta.id + "/" + respuesta.image_avatar};
                res.json(usuario)
            })
    },
    showImage: function(req,res) {
        db.Users.findByPk(req.params.id)
            .then (function(){
                res.send(req.params.image)
            })
    }
}

module.exports = controller;