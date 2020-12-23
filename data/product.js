const path = require('path')
const file = path.resolve(__dirname, 'products.json')
let products = require(file)
let fs = require('fs')

function retrieveListOfCategories(){
    let listOfCategories = []
    products.forEach(element => {
        if(listOfCategories.find(function(elementF){return elementF == element.category}) === undefined){
            listOfCategories.push(element.category)
        }
    })
    return listOfCategories
}

module.exports = {
    retrieveListOfCategories,
}