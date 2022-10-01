const Schema = require('../../models/welcomeChannel')

module.exports = {
  name: 'setchannel',
  description: 'Sets the welcome channel',
  options: [
    {
        name: "channel",
        description: "The channel",
        type: 'Channel',
        required: true
    }
  ],
  run: async (client, interaction) => {
    const channel = interaction.options.getChannel('channel')
    if (!channel) return interaction.reply({ content: 'Please specify a channel!'})

    Schema.findOne({ Guild: interaction.guild.id}, async (err, data) => {
      if (data) {
        data.Channel = channel.id
        data.save()
      } else {
        new Schema ({ 
          Guild: interaction.guild.id,
          Channel: channel.id
        }).save()
      }
      interaction.reply({ content: `${channel} has been set as your welcome channel`})
    })
  }
}