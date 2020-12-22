let db = require('../database/models')
const {body} = require('express-validator')

module.exports = [
    body('user_name').custom(function(value){
        return db.Users.findOne({ where: { user_name: value } })
        .then(user => {
          if (user) {
            return Promise.reject('E-mail already in use');
          }
        })
    })
]