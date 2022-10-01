const schema = require('../../models/levelsystem')
const {PermissionsBitField} = require('discord.js')


module.exports ={
  name: 'disable-level',
  description: 'Enable level system',
  run: async (client, interaction) => {
    if(!interaction.member.permissions.has(PermissionsBitField.Flags.KickMembers)) return interaction.reply('You do not have permission to use this command.')

    
    schema.findOne({
      Guild: interaction.guild.id
        }, async (err, data) => {
      if (err) throw err
      if (data) {
        interaction.reply({ content: `level feature is already disabled.`})
      } else {
        data = new schema({
          Guild: interaction.guild.id,
          Feature: false,
        })
        await data.save()
        interaction.reply({ content: 'Level is now disabled.'})
      }
    })
  }
}