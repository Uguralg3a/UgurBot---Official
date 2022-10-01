const mongoose = require('mongoose')

let Schema = new mongoose.Schema({
  Guild: String,
  Feature: Boolean,
  Channel: String
})

module.exports = mongoose.model('levelsystem', Schema)