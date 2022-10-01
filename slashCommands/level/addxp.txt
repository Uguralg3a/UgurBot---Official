const translate = require('@iamtraction/google-translate')
const { EmbedBuilder, PermissionsBitField } = require('discord.js')
const client = require('../../index')
const ms = require('ms')
const {hostedBy, everyoneMention} = require('../../config.json');
const canvacord = require("canvacord") // this is for a rank card when checking your rank, like mee6
let Levels = require('discord-xp')

const { ApplicationCommandType } = require('discord.js')

module.exports= {
    name : 'addxp',
	description: "addxp.",
	type: ApplicationCommandType.ChatInput,
    options: [
        {
            name: "user",
            description: "user",
            type: 6,
            required: true
        },
        {
            name: "xp",
            description: "xp",
            type: 3,
            required: true
        }

    ],
    
    run : async(client, interaction) => {
        const member = interaction.options.getUser("user")
        const xp = interaction.options.getString("xp")
        if (!xp || !Number(xp)) return message.reply({ content: 'XP must be a number'})
        const selfMember = interaction.member;

        if(selfMember.permissions.has(PermissionsBitField.Flags.Administrator)) {
            await Levels.appendXp(member.id, interaction.guild.id, xp)
        const user = await Levels.fetch(member.id, interaction.guild.id)
        const xPR = await Levels.xpFor(user.level + 1)
        interaction.reply({ content: `Added ${xp} XP to ${interaction.user.tag}`}) 
    
        } else{
            interaction.reply({ content: "You dont have the permission, to use this command!" })
        }

  }
}