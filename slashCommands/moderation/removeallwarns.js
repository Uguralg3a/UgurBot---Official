const translate = require('@iamtraction/google-translate')
const { EmbedBuilder, PermissionsBitField } = require('discord.js')
const client = require('../../index')
const { ApplicationCommandType } = require('discord.js')
const {warnsusernotfound, warnsremovedallsucess, nowarns, noperm} = require('../../messages.json')

module.exports= {
    name : 'clearwarns',
	description: "clearwarns.",
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
        if(!user) return message.channel.send('User not found.')
        db.findOne({ guildid : interaction.guild.id, user: user.user.id}, async(err,data) => {
            if(err) throw err;
            if(data) {
                await db.findOneAndDelete({ user : user.user.id, guildid: message.guild.id})
                interaction.reply(warnsremovedallsucess.replace("<usertag>", user.user.tag))
            } else {
                interaction.reply(nowarns)
            }
        })
    }
}