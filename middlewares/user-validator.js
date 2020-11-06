const path = require('path')
const {body} = require('express-validator')
const userDataFilePath = path.join(__dirname, '../data/user')
const userData = require(userDataFilePath)

module.exports = [
    body('user_name').custom(function(value){
        let user = userData.findByUserName(value)
        if(user){
            throw new Error('Este Email ya se encuentra registrado')
        }
        return true
    })
]