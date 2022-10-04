const translate = require('@iamtraction/google-translate')
const { EmbedBuilder, PermissionsBitField } = require('discord.js')
const client = require('../../index')
const { ApplicationCommandType } = require('discord.js')
const {unmutemembernotfound, unmutedmember,noperm} = require('../../messages.json')

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
        if(!interaction.member.permissions.has(PermissionsBitField.Flags.KickMembers)) return interaction.reply(noperm)
        const user = interaction.options.getUser('user') 
        if(!user) return interaction.reply(unmutemembernotfound)
        const role = interaction.guild.roles.cache.find(r => r.name.toLowerCase() === 'muted');

        await user.roles.remove(role)

        interaction.reply(unmutedmember.replace("<userdisplayname>", user.displayName))
    }
}