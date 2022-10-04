const client = require('../index')
const Schema = require('../models/welcomechannel')
const { EmbedBuilder } = require('discord.js')
const {welcomeembedtitle, welcomeembeddescription} = require('../messages.json')

client.on('guildMemberAdd', async (member) => {
  Schema.findOne({ Guild: member.guild.id}, async (e, data) => {
    if (!data) return
    const user = member.user
    const embed = new EmbedBuilder()
    .setTitle(welcomeembedtitle)
    .setDescription(welcomeembeddescription.replace("<user>", user).replace("<guildname>", member.guild.name))
    .setTimestamp()

    const channel = member.guild.channels.cache.get(data.Channel)
    channel.send({ embeds: [embed] })
    //channel.send({ content: `${user}`}) // if you want the user to get pinged when they join
  })
})