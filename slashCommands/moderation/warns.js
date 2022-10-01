const translate = require('@iamtraction/google-translate')
const { EmbedBuilder, PermissionsBitField } = require('discord.js')
const client = require('../../index')
const { ApplicationCommandType } = require('discord.js')
const db = require('../../models/warns')


module.exports= {
    name : 'warns',
	description: "warns.",
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
        if(!user) return message.channel.send('User not found.')
        db.findOne({ guildid: interaction.guild.id, user: user.id}, async(err, data) => {

            const e = new EmbedBuilder()
            .setTitle(`${user.tag}'s warns`)
            .setDescription( 
                data.content.map(
                    (w, i) => 
                    `\`${i + 1}\` | Moderator : ${interaction.guild.members.cache.get(w.moderator).user.tag}\nReason : ${w.reason}`
                ).toString()                    )
            if(err) throw err;
            if(data) {
                interaction.reply({
                    embeds: [e]
                }
                )
            } else {
                interaction.reply('User hat keine Daten!')
            }

        })

    }
}