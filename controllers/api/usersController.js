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
                    count: allUsers.length,
                    users: allUsers
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
                    image_avatar: respuesta.image_avatar};
                res.json(usuario)
            })
    }
}

module.exports = controller;