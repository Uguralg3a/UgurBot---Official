const client = require('..');
const channel = client.channels.cache.get('1025687301751312445')



client.on('message',message => {
  // Ignore bots
  if (message.author.bot) return
  // Send the embed
  const embed = new Discord.MessageEmbed()
    .setDescription(message.content)
    .setAuthor(message.author.tag, message.author.displayAvatarURL())
  channel.send(embed).catch(console.error)
})