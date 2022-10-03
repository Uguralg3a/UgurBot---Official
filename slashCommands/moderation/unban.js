const translate = require('@iamtraction/google-translate')
const { EmbedBuilder, PermissionsBitField } = require('discord.js')
const client = require('../../index')
const { ApplicationCommandType } = require('discord.js')

module.exports= {
    name : 'unban',
	description: "unban.",
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
        if(!interaction.member.permissions.has(PermissionsBitField.Flags.KickMembers)) return interaction.reply('You do not have permission to use this command.')
        const user = interaction.options.getUser('user') 
        if(!user) return interaction.reply('Member is not found.')
        interaction.guild.members.unban(user)
        interaction.reply({content: `Unbanned ${user}`})
    }
}