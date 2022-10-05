const Schema = require('../../models/coins')


module.exports = {
    name: "addcoins",
    description: "add coins to a user",
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
            type: 4,
            required: true
        }
    ],
    run: async(client, interaction) => {
        const user = interaction.options.getUser('user')
        const amount = interaction.options.getInteger('amount')

        
        let usertf = await Schema.findOne({ User: user });

        if (!usertf) {
            const newData = new Schema({
                User: user,
                coinsInWallet: parseInt(amount)
            });

            await newData.save()
            .catch(err => console.log(err))
            return amount;
        }

        interaction.reply(`Added ${amount} Coins to ${user}`)
        usertf.coinsInWallet += parseInt(amount);

        await usertf.save()
        .catch(err => console.log(err));

        return amount;    
    }
}