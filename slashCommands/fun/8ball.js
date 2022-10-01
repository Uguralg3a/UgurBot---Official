const { ApplicationCommandType } = require('discord.js');

module.exports = {
	name: '8ball',
	description: "8ball",
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

        if (!test) {
			return interaction.reply('Please ask me a question.');
		} else {
        let eightball = [
            'Geht so.',
            'Definitiv.',
            '100% JA.',
            'Ja, devinitiv..',
            'Was fragste mich das',
            'Klar',
            'no',
            'ja',
            'bist du dumm?',
            'Eventuell',
            'Viel Glück',
        ];
        let index = (Math.floor(Math.random() * Math.floor(eightball.length)));
        setTimeout(() => {
		interaction.reply({ content: eightball[index]}) 
        }, 750)
	}
}
};