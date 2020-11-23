const fs = require('fs')
const path = require('path')
const {check, validationResult, } = require('express-validator')
const usersFilePath = path.join(__dirname, '../data/users.json')
const userDataFilePath = path.join(__dirname, '../data/user')
let users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'))
let userData = require(userDataFilePath)
let bcryptjs = require('bcryptjs')
const productDataFilePath = path.join(__dirname, '../data/product')
let productData = require(productDataFilePath)

const controller = {
    login : function(req, res){
        res.render('users/login', { errors: [], listOfCategories : productData.retrieveListOfCategories() })
    },

    processLogin : function(req, res){
        let errors = validationResult(req)
        if (errors.isEmpty()) {
            let userLoggedIn = userData.findByUserName(req.body.user_name)
            if(!userLoggedIn){
                console.log('error')
                return res.render('users/login', { errors: [ {
                        value: '',
                        msg: 'E-mail incorrecto. Ingrese nuevamente los datos por favor.',
                         param: 'user_name',
                        location: 'body'
                    } ],
                  listOfCategories : productData.retrieveListOfCategories() }, )
            } else if(bcryptjs.compareSync(req.body.password, userLoggedIn.password)){
                req.session.user = userLoggedIn.user_name
                req.session.first_name = userLoggedIn.first_name
                req.session.last_name = userLoggedIn.last_name
                // if(req.body.rememberMe){
                //     res.cookie('rememberMe', user.user_name, { maxAge: 120 * 1000 })
                // }
                return res.render('users/userDetail', { userLoggedIn : userLoggedIn, listOfCategories : productData.retrieveListOfCategories() })
            }
        } else {
            return res.render('users/login', { errors: errors.errors, listOfCategories : productData.retrieveListOfCategories() } )
        }
    },

    logout : function(req, res){    
        req.session.destroy()
        //req.cookie('rememberMe', null, { maxAge : 0 })
        return res.render('/users/login', { listOfCategories : productData.retrieveListOfCategories() })
    },

    register : function(req, res){
        res.render('users/register', { 
            errors: [], 
            listOfCategories : productData.retrieveListOfCategories()
        } )
    },

    store : function(req, res){
        let errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.render('users/register', { errors: errors.errors, listOfCategories : productData.retrieveListOfCategories() } );
        }
        //hay que agregar validaciones de password y confirmación.
        userData.create({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            user_name: req.body.user_name,
            password: bcryptjs.hashSync(req.body.password_confirmation),
            rol: "user",
            image: "user_3.jpg"
        })
        res.redirect('users/login', { listOfCategories : productData.retrieveListOfCategories() })
    }
}

module.exports = controller;