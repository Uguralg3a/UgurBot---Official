const translate = require('@iamtraction/google-translate')
const { EmbedBuilder, PermissionsBitField } = require('discord.js')
const client = require('../../index')
const ms = require('ms')
const {hostedBy, everyoneMention} = require('../../config.json');

const { ApplicationCommandType } = require('discord.js')
const {giveawayrerollnomessageid, giveawayrerollsucess, giveawayrerollerror, noperm} = require("../../messages.json")

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
        if(!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) return interaction.reply(noperm)
        const id = interaction.options.getString('id')
        if(!id) return message.channel.send(giveawayrerollnomessageid)

       // const giveaway = client.giveaways.giveaways.find((g) => g.messageID === id)
        //if(!giveaway) return interaction.reply('Giveaway konnte nicht gefunden werden')

        client.giveaways
            .reroll(id)
            .then(() => {
                interaction.reply({content: giveawayrerollsucess, ephemeral: true});
            })
            .catch((err) => {
                interaction.reply({content: giveawayrerollerror.replace("<error>", `\n\`${err}\``), ephemeral: true});
            });
    }
        
}