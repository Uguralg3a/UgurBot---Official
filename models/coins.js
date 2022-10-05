const mongoose = require('mongoose')

const Schema = new mongoose.Schema({
    User: String,
    coinsInWallet: Number
})

module.exports = mongoose.model("coins", Schema)