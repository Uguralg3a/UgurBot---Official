const RoleSchema = require('../models/autorole')
const client = require('../index')
const { autoroledeletedby } = require('../messages.json')

client.on('guildMemberAdd', async (member, guild) => {
  RoleSchema.findOne({ Guild: member.guild.id }, async (err, data) => {
    if (!data) return;
    if (data) {
      const role = member.guild.roles.cache.find(role => role.id == data.Role)
      if (!role) {
        console.log(autoroledeletedby.replace("<role>", data.Role).replace("<guildid>", member.guild.id))
        return data.delete()
      }
      member.roles.add(role.id)
    }
  })
})