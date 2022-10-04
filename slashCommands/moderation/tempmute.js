const translate = require('@iamtraction/google-translate')
const { EmbedBuilder, PermissionsBitField } = require('discord.js')
const client = require('../../index')
const { ApplicationCommandType } = require('discord.js')
const {warnsusernotfound, warntimenotgiven, muterolenotfound, muterolecreated, unmutednow, memberalreadymuted, noperm} = require('../../messages.json')

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
        if(!interaction.member.permissions.has(PermissionsBitField.Flags.KickMembers)) return interaction.reply(noperm)
        const user = interaction.options.getUser('user') 
        const time = interaction.options.getString('time')
        if(!user) return interaction.reply(warnsusernotfound)
        if(!time) return interaction.reply(warntimenotgiven)
        const role = interaction.guild.roles.cache.find(role => role.name.toLowerCase() === 'muted')
        if(!role) {
            try {
                interaction.reply(muterolenotfound)

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
                interaction.reply(muterolecreated)
            } catch (error) {
                console.log(error)
            }
        };
        let role2 = interaction.guild.roles.cache.find(r => r.name.toLowerCase() === 'muted')
        if(user.roles.cache.has(role2.id)) return interaction.reply(memberalreadymuted.replace('<user>', Member.displayName))
        await user.roles.add(role2)
        interaction.reply(mutedmember.replace('<user>', Member.displayName))

        setTimeout(async () => {
            await user.roles.remove(role2)
            interaction.reply(unmutednow.replace("<user>", Member.displayName))
        }, ms(time))
    }
}