const blacklist = require('../../models/userBlacklist')
const {nodev, blacklistedsucessfully, alreadyblacklisted, noblacklistmember} = require('../../messages.json')

module.exports = {
  name: 'blacklist', 
  description: "Blacklist user",
  options: [
    {
        name: "user",
        description: "user",
        type: 6,
        required: true
    }
  ],
  run: async (client, interaction) => {
    if (interaction.user.id !== '654029828193779732') return interaction.reply({ content: nodev})
    const user = interaction.options.getUser("user")

    if (!user) return interaction.reply({ content: noblacklistmember})

    blacklist.findOne({
      ID: user.id
    }, async (err, data) => {
      if (err) throw err
      if (data) {
        interaction.reply({ content: alreadyblacklisted.replace("<usertag>", user.tag)})
      } else {
        data = new blacklist({ ID: user.id })
        data.save().catch(err => console.log(err))

        interaction.reply({ content: blacklistedsucessfully.replace("<usertag>", user.tag)})
      }
    })
  }
}