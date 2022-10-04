const client = require('../index')
const {Collection, ChannelType} = require("discord.js")
const voiceCollection = new Collection()
const Schema = require('../models/autochannel')


client.on("voiceStateUpdate", async(oldstate, newstate) => {
    Schema.findOne({ Guild: member.guild.id}, async (e, data) => {
    if (!data) return
    const user = await client.users.fetch(newstate.id)
    const member = newstate.guild.member(user)
    const channel = newstate.guild.channels.cache.get(data.Channel);

    if(!oldstate.channel && newstate.channel === channel) {
        const channel1 = await newstate.guild.channels.create(user.tag, {
            type: ChannelType.GuildVoice,
            parent: newstate.channel.parent,
        }) 
        member.voice.setChennel(channel1);
        voiceCollection.set(user.id, channel1.id)
    } else if(!newstate.channel) {
        if(oldstate.channelId === voiceCollection.get(newstate.id)) {
            return oldstate.channel.delete()
        }
    }
    })
})