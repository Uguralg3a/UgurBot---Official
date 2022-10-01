const translate = require('@iamtraction/google-translate')
const { EmbedBuilder, PermissionsBitField } = require('discord.js')
const client = require('../../index')
const { ApplicationCommandType } = require('discord.js')

module.exports= {
    name : 'tempmute',
	description: "tempmute.",
	type: ApplicationCommandType.ChatInput,
    options: [
        {
            name: "user",
            description: "User",
            type: 6,
            required: true
        },
        {
            name: "time",
            description: "time",
            type: 3,
            required: true
        }
        

    ],
    
    run : async(client, interaction) => {
        if(!interaction.member.permissions.has(PermissionsBitField.Flags.KickMembers)) return message.channel.send('You do not have permission to use this command.')
        const user = interaction.options.getUser('user') 
        const time = interaction.options.getString('time')
        if(!user) return interaction.reply('Member is not found.')
        if(!time) return interaction.reply('Please specify a time.')
        const role = interaction.guild.roles.cache.find(role => role.name.toLowerCase() === 'muted')
        if(!role) {
            try {
                interaction.reply('Muted role is not found, attempting to create muted role.')

                let muterole = await interaction.guild.roles.create({
                    data : {
                        name : 'muted',
                        permissions: []
                    }
                });
                interaction.guild.channels.cache.filter(c => c.type === 'text').forEach(async (channel, id) => {
                    await channel.createOverwrite(muterole, {
                        SEND_MESSAGES: false,
                        ADD_REACTIONS: false
                    })
                });
                interaction.reply('Muted role has sucessfully been created.')
            } catch (error) {
                console.log(error)
            }
        };
        let role2 = interaction.guild.roles.cache.find(r => r.name.toLowerCase() === 'muted')
        if(user.roles.cache.has(role2.id)) return interaction.reply(`${Member.displayName} has already been muted.`)
        await user.roles.add(role2)
        interaction.reply(`${user.displayName} is now muted.`)

        setTimeout(async () => {
            await user.roles.remove(role2)
            interaction.reply(`${Member.displayName} is now unmuted`)
        }, ms(time))
    }
}