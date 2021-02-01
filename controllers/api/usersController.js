
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
    }
}

module.exports = controller;