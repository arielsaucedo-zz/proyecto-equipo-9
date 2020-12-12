const path = require('path')
const file = path.resolve(__dirname, 'users.json')
let users = require(file)
let fs = require('fs')

function create(user){
    user.id = users.length + 1,
    users.push(user)
    fs.writeFileSync(file, JSON.stringify(users))
}

function findById(id){
    return users.find(function(user){
        return user.id == id
    })
}

function findByUserName(user_name){
    return users.find(function(user){
        return user.user_name == user_name
    })
}

module.exports = {
    create,
    findById,
    findByUserName,
}