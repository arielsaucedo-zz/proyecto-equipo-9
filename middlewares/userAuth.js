const path = require('path')
const userDataFilePath = path.join(__dirname, '../data/user')
let userData = require(userDataFilePath)

function userAuth(req, res, next) {
    let userLoggedIn = userData.findByUserName(req.session.user)
    console.log(userLoggedIn.rol)
    if(userLoggedIn.rol == 0){
        next()
    } else {
        res.redirect('/users/login')
    }
    next()
} 

module.exports = userAuth