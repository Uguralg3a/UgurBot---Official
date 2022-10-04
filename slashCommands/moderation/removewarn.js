const translate = require('@iamtraction/google-translate')
const { EmbedBuilder, PermissionsBitField } = require('discord.js')
const client = require('../../index')
const { ApplicationCommandType } = require('discord.js')
const {warnsusernotfound, noperm, warndeleted, nowarns } = require("../../messages.json")

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
        if(!interaction.member.permissions.has(PermissionsBitField.Flags.KickMembers)) return interaction.reply(noperm)
        const user = interaction.options.getUser('user') 
        if(!user) return interaction.reply(warnsusernotfound)
        db.findOne({ guildid : interaction.guild.id, user: user.user.id}, async(err,data) => {
            if(err) throw err;
            if(data) {
                let number = parseInt(args[1]) - 1
                data.content.splice(number, 1)
                interaction.reply(warndeleted)
                data.save()
            } else {
                interaction.reply(nowarns)
            }
        })
    }
}