let userData = require('../data/user')
module.exports = function(req, res, next){
    if(req.cookies.rememberMe && !req.session.user){
        let user = userData.findByUserName(req.cookies.rememberMe)
        req.session.user = user
        next()
    } else {
        next()
    }
}