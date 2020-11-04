const fs = require('fs');
const path = require('path');
const usersFilePath = path.join(__dirname, '../data/users.json');
let users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));
//const {check, validationResult, } = require('express-validator')

const controller = {
    login : function(req, res){
        res.render('users/login')
    },
    register : function(req, res){
        res.render('users/register')
    },
    store : function(req, res){
        //hay que agregar validaciones, ver el tema del ID, categoría, la imagen y pass.
        let newUser = {
            id: users.length + 1,
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            user_name: req.body.user_name,
            password: req.body.password_confirmation,
            category: "user",
            image: "user_3.jpg"
        }
        users.push(newUser)
        let usersString = JSON.stringify(users)
        fs.writeFileSync(usersFilePath, usersString)
        res.redirect('users/login')
    }
}

module.exports = controller;