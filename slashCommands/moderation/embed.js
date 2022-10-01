const translate = require('@iamtraction/google-translate')
const { EmbedBuilder, PermissionsBitField } = require('discord.js')
const client = require('../../index')
const { ApplicationCommandType } = require('discord.js')

module.exports= {
    name : 'embed',
	description: "mute.",
	type: ApplicationCommandType.ChatInput,
    options: [
        {
            name: "title",
            description: "title",
            type: 3,
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
        const title = interaction.options.getString("title")
        const description = interaction.options.getString("description")

        const eembed = new EmbedBuilder()
        .setTitle(title)
        .setDescription(description)
        interaction.reply({embeds: [eembed]})
    }
}