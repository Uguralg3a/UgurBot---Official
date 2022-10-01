const translate = require('@iamtraction/google-translate')
const { EmbedBuilder, PermissionsBitField } = require('discord.js')
const client = require('../../index')
const { ApplicationCommandType } = require('discord.js')

module.exports= {
    name : 'removewarns',
	description: "removewarns.",
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
        if(!user) return interaction.reply('User not found.')
        db.findOne({ guildid : interaction.guild.id, user: user.user.id}, async(err,data) => {
            if(err) throw err;
            if(data) {
                let number = parseInt(args[1]) - 1
                data.content.splice(number, 1)
                interaction.reply('Warn wurde Gelöscht')
                data.save()
            } else {
                interaction.reply('Dieses Mitglied hat keine Verwarnungen auf diesem Server!!')
            }
        })
    }
}