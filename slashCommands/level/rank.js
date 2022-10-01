const translate = require('@iamtraction/google-translate')
const { EmbedBuilder, PermissionsBitField } = require('discord.js')
const client = require('../../index')
const ms = require('ms')
const {hostedBy, everyoneMention} = require('../../config.json');
const canvacord = require("canvacord") // this is for a rank card when checking your rank, like mee6
let Levels = require('discord-xp')

const { ApplicationCommandType } = require('discord.js')

module.exports= {
    name : 'rank',
	description: "rank.",
	type: ApplicationCommandType.ChatInput,
    options: [
        {
            name: "user",
            description: "user",
            type: 6,
            required: false
        }

    ],
    
    run : async(client, interaction) => {
        let user = interaction.options.getUser("user") || interaction.member
    const User = await Levels.fetch(user.id, interaction.guild.id, true)
    const newxp = Levels.xpFor(parseInt(User.level) + 1)
    let rk = new canvacord.Rank()
    .setAvatar(user.user.displayAvatarURL({ format: 'png'}))
    .setCurrentXP(User.xp)
    .setRequiredXP(newxp)
    .setStatus(user.presence?.status ? user.presence.status : 'offline', true, 5)
    .setProgressBar('#00FFFF', "COLOR")
    .setUsername(user.user.username, '#FFFFFF') // you can make it any color
    .setDiscriminator(user.user.discriminator)
    .setLevel(User.level)
    .setBackground("IMAGE", 'https://cdn.discordapp.com/attachments/1014171418063290419/1021012564504760390/20220917_102411.jpg')
  rk.build().then(data => {
    let embed = new EmbedBuilder()
    //.setAuthor(user.user.username, message.guild.iconURL())
    /*.setColor('ff0000')
    .setDescription(`**LEVEL** - ${User.level}\n**Position** - ${User.position}\n**XP** - ${User.xp}/${newxp}`)*/
    .setImage('attachment://RankCard.png')
  
    interaction.reply({/* embeds: [embed],*/ files: [{ attachment: data, name: 'RankCard.png'}] })
  })
  }
}