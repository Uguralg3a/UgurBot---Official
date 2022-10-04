const mongoose = require('mongoose')

let Schema = mongoose.Schema({
    ID: String
})

module.exports = mongoose.model('blacklist', Schema)