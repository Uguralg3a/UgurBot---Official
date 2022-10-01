const Levels = require("discord-xp")
const { mongo } = require('../config.json')
Levels.setURL(mongo)
const client = require('../index')
const Schema = require('../models/levelsystem')

client.on('messageCreate', async (message) => {
  if (message.author.bot) return
  if (!message.guild) return

  const random = Math.floor(Math.random() * 98) + 1
  const leveledUp = await Levels.appendXp(message.author.id, message.guild.id, random)

  Schema.findOne({ Guild: message.guild.id, Feature: true}, async (e, data) => {
    if (!data) return
    if (leveledUp) {
    const user = await Levels.fetch(message.author.id, message.guild.id)
    client.channels.cache.get(data.Channel).send({ content: `Congratulations <@${message.author.id}>, you have leveled up to level ${user.level}!`})
    }
  })

  /*if (leveledUp) {
    const user = await Levels.fetch(message.author.id, message.guild.id)
    client.channels.cache.get(`1014171404616347718`).send({ content: `Congratulations <@${message.author.id}>, you have leveled up to level ${user.level}!`})
    //message.channel.send({ content: `Congratulations <@${message.author.id}>, you have leveled up to level ${user.level}!`})
  }*/
})