const { ApplicationCommandType } = require('discord.js');
const Schema = require('../../models/birthday')
const {nobirthday, userbirthday} = require("../../messages.json")


module.exports = {
	name: 'checkbirthday',
	description: "checkbday",
	type: ApplicationCommandType.ChatInput,
	cooldown: 3000, 
    options: [
        {
            "name": "user",
            "description": "user",
            "type": 6,
            "required": true,
        }
    ],

    /**
     * 
     * @param {Client} client 
     * @param {interaction} interaction 
     */
	run: async (client, interaction) => {
        const user = interaction.options.getUser('user');

        Schema.findOne({ User: user.id, Guild: interaction.guild.id }, async ( err, data) => {
            if(!data) return interaction.reply(nobirthday)
            interaction.reply(userbirthday.replace('<user>', user).replace('<birthday>', data.Birthday))
        })
	}
};