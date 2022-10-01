const schema = require('../../models/autorole')
const {PermissionsBitField} = require('discord.js')


module.exports = {
  name: 'disable-autorole',
  description: 'Disables auto role',
  run: async (client, interaction) => {
    if(!interaction.member.permissions.has(PermissionsBitField.Flags.KickMembers)) return interaction.reply('You do not have permission to use this command.')

    schema.findOne({
      Guild: interaction.guild.id
    }, async (err, data) => {
      if (err) throw err
      if (!data) {
        interaction.reply({ content: 'Auto role is already disabled'})
      } else {
        await schema.findOneAndDelete({
          Guild: interaction.guild.id
        })
        interaction.reply({ content: 'Auto role has been disabled.'})
      }
    })
  }
}