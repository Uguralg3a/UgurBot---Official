const color = require('../../color.json');
const { ApplicationCommandType, EmbedBuilder } = require('discord.js');

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
        },
        {
            "name": "color",
            "description": "Color",
            "type": 3,
            "required": true,
            "choices": [
                {
                    name: "aqua",
                    value: `${color.aqua}`
                }, 
                {
                    name: "dark aqua",
                    value: `${color.DarkAqua}`
                },
                {
                    name: "Green",
                    value: `${color.Green}`
                },
                {
                    name: "DarkGreen",
                    value: `${color.DarkGreen}`
                },
                {
                    name: "Blue",
                    value: `${color.Blue}`
                },
                {
                    name: "DarkBlue",
                    value: `${color.DarkBlue}`
                },
                {
                    name: "Purple",
                    value: `${color.Purple}`
                },
                {
                    name: "DarkPurple",
                    value: `${color.DarkPurple}`
                },
                {
                    name: "LuminousVividPink",
                    value: `${color.LuminousVividPink}`
                },
                {
                    name: "DarkVividPink",
                    value: `${color.DarkVividPInk}`
                },
                {
                    name: "Gold",
                    value: `${color.Gold}`
                }, 
                {
                    name: "DarkGold",
                    value: `${color.DarkGold}`
                },
                {
                    name: "Orange",
                    value: `${color.Orange}`
                },
                {
                    name: "DarkOrange",
                    value: `${color.DarkOrange}`
                },
                {
                    name: "Red",
                    value: `${color.Red}`
                },
                {
                    name: "DarkRed",
                    value: `${color.DarkRed}`
                },
                {
                    name: "Grey",
                    value: `${color.Grey}`
                },
                {
                    name: "DarkGrey",
                    value: `${color.DarkerGray}`
                },
                {
                    name: "LightGrey",
                    value: `${color.LIghtGrey}`
                },
                {
                    name: "Navy",
                    value: `${color.Navy}`
                },
                {
                    name: "DarkNavy",
                    value: `${color.DarkNavy}`
                },
                {
                    name: "Yellow",
                    value: `${color.Yellow}`
                }
            ]
        }
    ],

    /**
     * 
     * @param {Client} client 
     * @param {interaction} interaction 
     */
	run: async (client, interaction) => {
        const test = interaction.options.getString('content');
        const colorop = interaction.options.getString('color')
        const embed = new EmbedBuilder()
        .setDescription(`${test}`)
        .setColor(colorop)

		interaction.reply({ embeds: [embed] }) 
	}
};