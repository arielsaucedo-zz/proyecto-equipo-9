const path = require('path')
const userDataFilePath = path.join(__dirname, '../data/user')
let userData = require(userDataFilePath)

function userAuth(req, res, next) {
    console.log(res.locals);
    if (res.locals.user != undefined){
        let userLoggedIn = userData.findByUserName(res.locals.user)
        if(userLoggedIn.rol == 0){
            next()
        } else {
            res.redirect('/')
        }
        next()
    } else{
        res.redirect('/users/login')
    }
} 

module.exports = userAuth