const Schema = require('../../models/coins')


module.exports = {
    name: "balance",
    description: "balance",
    options: [
        {
            name: "user",
            description: "the user",
            type: 6,
            required: true
        },
    ],
    run: async(client, interaction) => {
        const user = interaction.options.getUser('user')
        
        let usertf = await Schema.findOne({ User: user });

        Schema.findOne({ User: user }, async ( err, data) => {
            if(!data) return interaction.reply("No Data")
            interaction.reply(`${user} has ${data.coinsInWallet} Coins`)
        })
    }
}