const schema = require('../../models/autorole')
const {PermissionsBitField} = require('discord.js')
const {autorolealreadydisabled, autoroledisabled, noperm} = require("../../messages.json")


module.exports = {
  name: 'disable-autorole',
  description: 'Disables auto role',
  run: async (client, interaction) => {
    if(!interaction.member.permissions.has(PermissionsBitField.Flags.KickMembers)) return interaction.reply(noperm)

    schema.findOne({
      Guild: interaction.guild.id
    }, async (err, data) => {
      if (err) throw err
      if (!data) {
        interaction.reply({ content: autorolealreadydisabled})
      } else {
        await schema.findOneAndDelete({
          Guild: interaction.guild.id
        })
        interaction.reply({ content: autoroledisabled})
      }
    })
  }
}