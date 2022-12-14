const client = require("../index")
const {EmbedBuilder, PermissionsBitField, ChannelType} = require('discord.js')

client.on('guildCreate', (guild) => {
    let channelToSend;

    guild.channels.cache.forEach((channel) => {
        if(
            channel.type === ChannelType.GuildText &&
            !channelToSend &&
            channel.permissionsFor(guild.members.me).has(PermissionsBitField.Flags.SendMessages)
        )
        channelToSend = channel;
    })

    if(!channelToSend) return;

    const embed = new EmbedBuilder()
    .setTitle("Thanks for inviting me!")
    .setDescription("Thanks for inviting me. My prefix is `/` and i'll be happy to help out in this server.")
    .addFields({
        name: "If you need any help to the Bot, join the link below.",
        value: "[Here is a link lol](https://discord.gg/a6thTVjCE4)"
    })

    channelToSend.send({embeds: [embed]})
})