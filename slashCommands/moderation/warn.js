const translate = require('@iamtraction/google-translate')
const { EmbedBuilder, PermissionsBitField } = require('discord.js')
const client = require('../../index')
const { ApplicationCommandType } = require('discord.js')
const db = require('../../models/warns')


module.exports= {
    name : 'warn',
	description: "warn.",
	type: ApplicationCommandType.ChatInput,
    options: [
        {
            name: "user",
            description: "User",
            type: 6,
            required: true
        },
        {
            name: "grund",
            description: "grund",
            type: 3,
            required: true
        }

    ],
    
    run : async(client, interaction) => {
        if(!interaction.member.permissions.has(PermissionsBitField.Flags.KickMembers)) return message.channel.send('You do not have permission to use this command.')
        const user = interaction.options.getUser('user') 
        if(!user) return message.channel.send('User not found.')
        const reason = interaction.options.getString('grund')
        db.findOne({ guildid: interaction.guild.id, user: user.id}, async(err, data) => {
            if(err) throw err;
            if(!data) {
                data = new db({
                    guildid: interaction.guild.id,
                    user : user.id,
                    content : [
                        {
                            moderator : interaction.user.id,
                            reason : reason
                        }
                    ]
                })
            } else {
                const obj = {
                    moderator: interaction.author.id,
                    reason : reason
                }
                data.content.push(obj)
            }
            data.save()
        });

        const warnu = new EmbedBuilder()
        .setTitle("Warn")
            .setDescription(`Du wurdest für ${reason} gewarnt`)

        const warnc = new EmbedBuilder()
        .setTitle("Warn")
            .setDescription(`${user} wurde für ${reason} gewarnt!`)

        /*user.send({
            embeds: [warnu]
        }
        )*/
        interaction.reply({
            embeds:[warnc]
        }

        )


         
        
     }

    }
