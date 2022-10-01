const { ApplicationCommandType } = require('discord.js');

module.exports = {
	name: 'say',
	description: "say",
	type: ApplicationCommandType.ChatInput,
	cooldown: 3000,
    options: [
        {
            "name": "content",
            "description": "content",
            "type": 3,
            "required": true,
        }
    ],

    /**
     * 
     * @param {Client} client 
     * @param {interaction} interaction 
     */
	run: async (client, interaction) => {
        const test = interaction.options.getString('content');
		interaction.reply({ content: `${test}` }) 
	}
};