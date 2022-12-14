const Schema = require('../../models/autochannel')
const {PermissionsBitField} = require('discord.js')
const {nochannelforautochannel, savedautochannel} = require('../../messages.json')
module.exports = {
  name: 'setautochannel',
  description: 'Sets the voice channel to create own channel',
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
    if (!channel) return interaction.reply({ content: nochannelforautochannel})


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
        interaction.reply({ content: savedautochannel.replace("<channel>", channel)})
      })
    }
  }