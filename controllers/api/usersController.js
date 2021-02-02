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
<<<<<<< HEAD
=======
    find: function(req,res) {
        db.Users.findByPk(req.params.id)
            .then(function(pelicula) {
                pelicula.password = "Esta contraseña es privada!"
                res.json(pelicula)
            })
    }
>>>>>>> df9740da0fde71a402eae00ed4f05ddc9db5c15b
}

module.exports = controller;