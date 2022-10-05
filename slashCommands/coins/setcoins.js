const Schema = require('../../models/coins')


module.exports = {
    name: "setcoins",
    description: "set coins to a user",
    options: [
        {
            name: "user",
            description: "the user",
            type: 6,
            required: true
        },
        {
            name: "amount",
            description: "the amount to add",
            type: 10,
            required: true
        }
    ],
    run: async(client, interaction) => {
        const user = interaction.options.getUser('user')
        const amount = interaction.options.getNumber('amount')

        Schema.findOne({User: user, Coins: amount}, async(err, data) => {
            if(data) {
                data.user = user;
                data.coins = amount;
                data.save();
            } else {
                new Schema({
                    User: user,
                    Coins: amount
                }).save();
            }
        })

        interaction.reply(`Added ${amount} Coins to ${user}`)
    }
}