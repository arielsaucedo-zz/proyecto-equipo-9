const fs = require('fs')
const path = require('path')
const {
    check,
    validationResult,
} = require('express-validator')
const usersFilePath = path.join(__dirname, '../data/users.json')
const userDataFilePath = path.join(__dirname, '../data/user')
let users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'))
let userData = require(userDataFilePath)
let bcryptjs = require('bcryptjs')
const productDataFilePath = path.join(__dirname, '../data/product')
let productData = require(productDataFilePath)
let db = require('../database/models')

const controller = {
    login: function (req, res) {
        res.render('users/login', {
            errors: []
        })
    },

    processLogin: function (req, res) {
        let errors = validationResult(req)

        db.Users.findOne({
                where: {
                    user_name: req.body.user_name
                }
            })
            .then((resultado) => {
                if (errors.isEmpty()) {
                    let userLoggedIn = resultado
                    if (!userLoggedIn) {
                        console.log('error')
                        return res.render('users/login', {
                            errors: [{
                                value: '',
                                msg: 'E-mail incorrecto. Ingrese nuevamente los datos por favor.',
                                param: 'user_name',
                                location: 'body'
                            }]
                        })
                    } else if (bcryptjs.compareSync(req.body.password, userLoggedIn.password)) {
                        req.session.user = userLoggedIn.user_name
                        req.session.first_name = userLoggedIn.first_name
                        req.session.last_name = userLoggedIn.last_name
                        req.session.userId = userLoggedIn.id
                        console.log(req.session);
                        if (req.body.rememberMe) {
                            res.cookie('rememberMe', userLoggedIn.user_name, {
                                maxAge: 120 * 1000
                            })
                        }
                        return res.redirect('/')
                    }
                } else {
                    return res.render('users/login', {
                        errors: errors.errors
                    })
                }
            })
    },

    logout: function (req, res) {
        req.session.destroy()
        res.cookie('rememberMe', null, {
            maxAge: 0
        })
        return res.render('users/login', {
            errors: []
        })
    },

    register: function (req, res) {
        res.render('users/register', {
            errors: []
        })
    },

    store: function (req, res, next) {
        let errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.render('users/register', {
                errors: errors.errors
            });
        }

        let filenameVal = ''
        if (req.files[0] != undefined) {
            filenameVal = req.files[0].filename
        }

        db.Users.create({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            user_name: req.body.user_name,
            password: bcryptjs.hashSync(req.body.password_confirmation),
            role_id: 1,
            image: filenameVal
        })
        res.redirect('users/login')
    },

    show: function (req, res, next) {
        let user = {}
        db.Users.findOne({
                where: {
                    user_name: res.locals.user
                }
            })
            .then((resultado) => {
                user = resultado
                res.render('users/userDetail', {
                    userLoggedIn: user,
                    errors: []
                })
            })
    }
}

module.exports = controller;