const got = require('got')
const { MessageEmbed, EmbedBuilder, InteractionCollector } = require('discord.js')

const client = require('../../index')
const { ApplicationCommandType } = require('discord.js')

module.exports= {
    name : 'meme',
	description: "meme.",
	type: ApplicationCommandType.ChatInput,
    run: async(client, interaction) => {
        got('https://www.reddit.com/r/memes/random/.json').then(res => {
            let content = JSON.parse(res.body)
            const embed =                 new EmbedBuilder()
            .setTitle(content[0].data.children[0].data.title)
            .setImage(content[0].data.children[0].data.url)
            .setDescription(`👍 ${content[0].data.children[0].data.ups} 👎 ${content[0].data.children[0].data.downs} | Comments : ${content[0].data.children[0].data.num_comments}`)
    

            interaction.reply({embeds: [embed]})
        })
    }
}