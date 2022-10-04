const Schema = require('../../models/welcomechannel')
const {PermissionsBitField} = require('discord.js')
const {nowelcomechannelgiven, setwelcomechannel} = require("../../messages.json")

module.exports = {
  name: 'setchannel',
  description: 'Sets the welcome channel',
  options: [
    {
        name: "channel",
        description: "The channel",
        type: 7,
        required: true
    }
  ],
  run: async (client, interaction) => {
    if(!interaction.member.permissions.has(PermissionsBitField.Flags.KickMembers)) return interaction.reply('You do not have permission to use this command.')

    const channel = interaction.options.getChannel('channel')
    if (!channel) return interaction.reply({ content: nowelcomechannelgiven})

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
      interaction.reply({ content: setwelcomechannel.replace("<channel>", channel)})
    })
  }
}