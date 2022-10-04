const schema = require('../../models/autorole')
const {PermissionsBitField} = require('discord.js')
const {noperm, noroleforautorolementioned, autoroleisalreadyenabled, autoroleenabled} = reqiure("../../messages.json")


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
    if(!interaction.member.permissions.has(PermissionsBitField.Flags.KickMembers)) return interaction.reply(noperm)

    const role = interaction.options.getRole('role')
    if (!role) return interaction.reply({ content: noroleforautorolementioned})
    schema.findOne({
      Guild: interaction.guild.id
    }, async (err, data) => {
      if (err) throw err
      if (data) {
        interaction.reply({ content: autoroleisalreadyenabled})
      } else {
        data = new schema({
          Guild: interaction.guild.id,
          Role: role.id
        })
        await data.save()
        interaction.reply({ content: autoroleenabled})
      }
    })
  }
}