const mongoose = require('mongoose')

const Schema = new mongoose.Schema({
    TagName: String,
    TagMessage: String,
    TagCreatedUser: String,
    TagGuild: String,
})

module.exports = mongoose.model("tag", Schema)