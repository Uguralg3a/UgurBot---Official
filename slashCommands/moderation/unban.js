const translate = require('@iamtraction/google-translate')
const { EmbedBuilder, PermissionsBitField } = require('discord.js')
const client = require('../../index')
const { ApplicationCommandType } = require('discord.js')
const {unbannedmembernotfound, unbannedmember,noperm} = require('../../messages.json')

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
        if(!interaction.member.permissions.has(PermissionsBitField.Flags.KickMembers)) return interaction.reply(noperm)
        const user = interaction.options.getUser('user') 
        if(!user) return interaction.reply(unbannedmembernotfound)
        interaction.guild.members.unban(user)
        interaction.reply({content: unbannedmember.replace("<user>", user)})
    }
}