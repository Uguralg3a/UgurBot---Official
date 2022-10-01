const translate = require('@iamtraction/google-translate')
const { EmbedBuilder, PermissionsBitField } = require('discord.js')
const client = require('../../index')
const { ApplicationCommandType } = require('discord.js')

module.exports= {
    name : 'unmute',
	description: "unmute.",
	type: ApplicationCommandType.ChatInput,
    options: [
        {
            name: "user",
            description: "User",
            type: 6,
            required: true
        },
    

    ],
    
    run : async(client, interaction) => {
        if(!interaction.member.permissions.has(PermissionsBitField.Flags.KickMembers)) return message.channel.send('You do not have permission to use this command.')
        const user = interaction.options.getUser('user') 
        if(!user) return interaction.reply('Member is not found.')
        const role = interaction.guild.roles.cache.find(r => r.name.toLowerCase() === 'muted');

        await user.roles.remove(role)

        interaction.reply(`${user.displayName} is now unmuted`)
    }
}