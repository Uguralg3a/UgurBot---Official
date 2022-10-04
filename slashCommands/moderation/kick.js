const translate = require('@iamtraction/google-translate')
const { EmbedBuilder, PermissionsBitField } = require('discord.js')
const client = require('../../index')
const { ApplicationCommandType } = require('discord.js')
const {kicknomember, kickedmember, noperm} = require('../../messages.json')

module.exports= {
    name : 'kick',
	description: "kick.",
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
        if(!interaction.member.permissions.has(PermissionsBitField.Flags.KickMembers)) return interaction.reply(noperm)
        const user = interaction.options.getUser('user') 
        if(!user) return interaction.reply(kicknomember)
        interaction.guild.members.kick(user)
        interaction.reply({content: kickedmember.replace("<user>", user )})
    }
}