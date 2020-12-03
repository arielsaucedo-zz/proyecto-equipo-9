const path = require('path')
const userDataFilePath = path.join(__dirname, '../data/user')
let userData = require(userDataFilePath)

function userAuth(req, res, next) {
    let userLoggedIn = userData.findByUserName(req.query.user)
    console.log(req.query.user);
    if(userLoggedIn.rol == 0){
        next()
    } else {
        res.redirect('/')
    }
    next()
} 

module.exports = userAuth