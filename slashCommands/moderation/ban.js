const translate = require('@iamtraction/google-translate')
const { EmbedBuilder, PermissionsBitField } = require('discord.js')
const client = require('../../index')
const { ApplicationCommandType } = require('discord.js')
const {banmembernotfound, bannedmember, noperm} = require("../../messages.json")

module.exports= {
    name : 'ban',
	description: "ban.",
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
        if(!user) return interaction.reply(banmembernotfound)
        interaction.guild.members.ban(user)
        interaction.reply({content: bannedmember.replace("<user>", user)})
    }
}