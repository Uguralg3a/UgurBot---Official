const client = require("../index")
const {EmbedBuilder, PermissionsBitField} = require('discord.js')

client.on('guildCreate', (guild) => {
    let channelToSend;

    guild.channels.cache.forEach((channel) => {
        if(
            channel.type === "text" &&
            !channelToSend &&
            channel.permissionsFor(guild.me).has("SEND_MESSAGES")
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

    channelToSend.send(embed)
})