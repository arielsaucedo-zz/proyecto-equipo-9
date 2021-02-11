let db = require('../database/models')

function userAuth(req, res, next) {
    if (res.locals.user != undefined){
        db.Users.findOne({
            where: {
                user_name: res.locals.user
            }
        })
        .then((userLoggedIn) => {
            if( userLoggedIn.role_id == 2){
                next()
            } else {
                return res.redirect('/')
            }
        })
        .catch(function(error){
            console.log(error)
            res.send('')
        })
    } else{
        return res.redirect('/users/login')
    }
} 


module.exports = userAuth