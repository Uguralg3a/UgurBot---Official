const translate = require('@iamtraction/google-translate')
const { EmbedBuilder, PermissionsBitField } = require('discord.js')
const client = require('../../index')
const { ApplicationCommandType } = require('discord.js')

module.exports= {
    name : 'poll',
	description: "poll.",
	type: ApplicationCommandType.ChatInput,
    options: [
        {
            name: "channel",
            description: "channel",
            type: 7,
            required: true
        },
        {
            name: "description",
            description: "description",
            type: 3,
            required: true 
        },
        

    ],
    
    run : async(client, interaction) => {
        if(!interaction.member.permissions.has(PermissionsBitField.Flags.KickMembers)) return message.channel.send('You do not have permission to use this command.')
        const channel = interaction.options.getChannel("title")
        const description = interaction.options.getString("description")

        const eembed = new EmbedBuilder()
        .setTitle("New Poll")
        .setDescription(description)
        let msgEmbed = await channel.send(eembed)
        await msgEmbed.react('👍')
        await msgEmbed.react('👎')
    }
}