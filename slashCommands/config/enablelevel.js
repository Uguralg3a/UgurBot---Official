const schema = require('../../models/levelsystem')
const {PermissionsBitField} = require('discord.js')


module.exports ={
  name: 'enable-level',
  description: 'Enable level system',
  run: async (client, interaction) => {
    if(!interaction.member.permissions.has(PermissionsBitField.Flags.KickMembers)) return interaction.reply('You do not have permission to use this command.')

    
    schema.findOne({
      Guild: interaction.guild.id
    }, async (err, data) => {
      if (err) throw err
      if (data) {
        interaction.reply({ content: `level feature is already enabled.`})
      } else {
        data = new schema({
          Guild: interaction.guild.id,
          Feature: true,
        })
        await data.save()
        interaction.reply({ content: 'level is now enabled.'})
      }
    })
  }
}