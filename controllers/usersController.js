let bcryptjs = require('bcryptjs')
let db = require('../database/models')

const {
    check,
    validationResult,
} = require('express-validator')

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
        .catch(function(error){
            console.log(error)
            res.send('')
        })
    },

    logout: function (req, res) {
        req.session.destroy()
        res.locals.user = '' // se limpia valor de res.locals.user debido a que era necesario re-ejecutar logout para anular valor de res.locals.user.
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
            role_id: 2,
            image_avatar: filenameVal
        })
        .catch(function(error){
            console.log(error)
            res.send('')
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
        .catch(function(error){
            console.log(error)
            res.send('')
        })
    },

    update: function (req, res, next) {
        let errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.render('/userDetail/:id', {
                errors: errors.errors
            });
        }

        let filenameVal = ''
        if (req.files[0] != undefined) {
            filenameVal = req.files[0].filename
        }

        db.Users.update({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            user_name: req.body.user_name,
            password: bcryptjs.hashSync(req.body.password_confirmation),
            role_id: 1,
            image_avatar: filenameVal
        })
        .catch(function(error){
            console.log(error)
            res.send('')
        })
        res.redirect('/')
    },
}

module.exports = controller;