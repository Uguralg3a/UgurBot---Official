const schema = require('../../models/autorole')
const {PermissionsBitField} = require('discord.js')


module.exports ={
  name: 'enable-autorole',
  description: 'Enable auto role system',
  options: [
    {
        name: "role",
        description: "role",
        required: true,
        type: 8
    }
  ],
  run: async (client, interaction) => {
    if(!interaction.member.permissions.has(PermissionsBitField.Flags.KickMembers)) return interaction.reply('You do not have permission to use this command.')

    const role = interaction.options.getRole('role')
    if (!role) return interaction.reply({ content: 'Please specify the role you want to add for autoroles.'})
    schema.findOne({
      Guild: interaction.guild.id
    }, async (err, data) => {
      if (err) throw err
      if (data) {
        interaction.reply({ content: `Auto role feature is already enabled.`})
      } else {
        data = new schema({
          Guild: interaction.guild.id,
          Role: role.id
        })
        await data.save()
        interaction.reply({ content: 'Auto role is now enabled.'})
      }
    })
  }
}