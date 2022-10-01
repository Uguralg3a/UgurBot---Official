const translate = require('@iamtraction/google-translate')
const { EmbedBuilder, PermissionsBitField } = require('discord.js')
const client = require('../../index')
const ms = require('ms')
const {hostedBy, everyoneMention} = require('../../config.json');
const canvacord = require("canvacord") // this is for a rank card when checking your rank, like mee6
let Levels = require('discord-xp')

const { ApplicationCommandType } = require('discord.js')

module.exports= {
    name : 'leaderboard',
	description: "leaderboard.",
	type: ApplicationCommandType.ChatInput,

    
    run : async(client, interaction) => {
        const rawLeader = await Levels.fetchLeaderboard(interaction.guild.id, 10) // the amount of people you want to be shown on the leaderboard

        // if (rawLeader.length > 1) return message.reply({ content: 'There is no one on the leaderboard!'})
    
        const leaderboard = await Levels.computeLeaderboard( client, rawLeader, true) // processing the leaderboard with discord-xp
    
        const lb = leaderboard.map( (e) => 
        `\`${e.position}\`. **${e.username}#${e.discriminator}** - Level: **${e.level}** - XP: **${e.xp.toLocaleString()}**`)
    
        const embed = new EmbedBuilder()
        .setTitle(`**${interaction.guild.name}'s Leaderboard**`)
        .setDescription(`${lb.join('\n\n')}`)
        .setColor('ff0000')
    
        interaction.reply({ embeds: [embed] })
  }
}