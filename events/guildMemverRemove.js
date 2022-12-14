const client = require('../index')
const Schema = require('../models/leavechannel')
const {leavemessage} = require("../messages.json")

client.on('guildMemberRemove', async (member) => {
  Schema.findOne({ Guild: member.guild.id}, async (e, data) => {
    if (!data) return
    const user = member.user
    const channel = member.guild.channels.cache.get(data.Channel)
    channel.send({ content: leavemessage.replace("<user>", user)})
  })
})