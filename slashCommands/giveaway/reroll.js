const translate = require('@iamtraction/google-translate')
const { EmbedBuilder, PermissionsBitField } = require('discord.js')
const client = require('../../index')
const ms = require('ms')
const {hostedBy, everyoneMention} = require('../../config.json');

const { ApplicationCommandType } = require('discord.js')

module.exports= {
    name : 'reroll',
	description: "reroll a giveaway.",
	type: ApplicationCommandType.ChatInput,
    options: [
        {
            name: "id",
            description: "MessageID vom Giveaway",
            type: 3,
            required: true
        }

    ],
    
    run : async(client, interaction) => {
        if(!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) return message.channel.send('You do not have permissions to use this command')
        const id = interaction.options.getString('id')
        if(!id) return message.channel.send('Bitte Gebe eine MessageID an!')

       // const giveaway = client.giveaways.giveaways.find((g) => g.messageID === id)
        //if(!giveaway) return interaction.reply('Giveaway konnte nicht gefunden werden')

        client.giveaways
            .reroll(id)
            .then(() => {
                interaction.reply({content: 'Success! Giveaway rerolled!', ephemeral: true});
            })
            .catch((err) => {
                interaction.reply({content: `An error has occurred, please check and try again.\n\`${err}\``, ephemeral: true});
            });
    }
        
}