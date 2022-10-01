const { MessageEmbed, EmbedBuilder } = require('discord.js');
const { ApplicationCommandType } = require('discord.js');
const mpi = require("mc-player-api");

module.exports = {
	name: 'mcplayerinfo',
	description: "Get a info from a mc palyer",
	type: ApplicationCommandType.ChatInput,
	cooldown: 3000,
    options: [
        {
            "name": "name",
            "description": "name",
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
        const user = interaction.options.getString('name');
        const userembed = new EmbedBuilder()
        .setTitle(`Minecraft Player information von ${user.username}`)
        .setFields(
            {
                name: "Created At",
                value: `: ${user.created_at}`
            },
            {
                name: "UUID",
                value: `: ${user.uuid}`
            },
            {
                name: "Skin",
                vale: `: ${user.skin}`
            },
            {
                name: "Skininfo",
                value: `: ${user.skin_info}`
            },
            {
                name: "Skin Render",
                value: `: ${user.skin_renders}`
            }
        )
		mpi.getUser(user).then(user => {
            interaction.reply({embeds: [userembed]});
        });
	}
};