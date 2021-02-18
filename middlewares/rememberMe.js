let db = require('../database/models')

module.exports = function(req, res, next){
    if(req.cookies.rememberMe && !req.session.user){
        db.Users.findOne({
            where: {
                user_name: req.cookies.rememberMe
            }
        })
        .then((userDB) => {
            req.session.user = userDB
            next()
        })
    } else {
        next()
    }
}