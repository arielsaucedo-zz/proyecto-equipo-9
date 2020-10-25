const controller = {
    login : function(req, res){
        res.render('users/login')
    },
    register : function(req, res){
        res.render('users/register')
    },
    store : function(req, res){
        res.redirect('users/login')
    }
}

module.exports = controller;