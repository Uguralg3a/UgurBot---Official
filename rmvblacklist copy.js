const blacklist = require('./models/userBlacklist')
const {nodev, noremoveblacklistuser, removedblacklist, notblacklisted} = require('./messages.json')

module.exports = {
  name: 'rmvblacklist',
  description: "Remove user from blacklist",
  options: [
    {
        name: "user",
        description: "user",
        type: 6,
        required: true
    }
],
  run: async (client, interaction) => {
    if (message.author.id !== '654029828193779732') return interaction.reply(nodev)
    const user = interaction.options.getUser("user");
    if (!user) return interaction.reply({ content: noremoveblacklistuser})

    blacklist.findOne({
      ID: user.user.id
    }, async (err, data) => {
      if (err) throw err
      if (data) {
        await blacklist.findOneAndDelete({
          ID: user.user.id
        }).catch(err => console.log(err))

        interaction.reply({ content: removedblacklist.replace("<usertag>", user.user.tag)})
      } else {
        interaction.reply({ content: notblacklisted.replace("<usertag>", user.user.tag)})
      }
    })
  }
}