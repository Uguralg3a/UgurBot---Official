const { ApplicationCommandType,EmbedBuilder, ActionRowBuilder, SelectMenuBuilder  } = require('discord.js');
const color = require("../../color.json")

module.exports = {
	name: 'help',
	description: "help.",
	type: ApplicationCommandType.ChatInput,
	cooldown: 3000,
  

    /**
     * 
     * @param {Client} client 
     * @param {interaction} interaction 
     */
	run: async (client, interaction) => {
        const row = new ActionRowBuilder()
			.addComponents(
				new SelectMenuBuilder()
					.setCustomId('birthday')
					.setPlaceholder('Birthday Commands 🎁')
					.addOptions([
						{
							label: 'setbirthday',
							description: 'set a birthday',
							value: 'setbirthday',
						},
						{
							label: 'checkbirthday',
							description: 'check a birthday',
							value: 'checkbirthday',
						},
					]),
            
            )

            const row1 = new ActionRowBuilder()
            .addComponents(
                new SelectMenuBuilder()
                .setCustomId("config")
                .setPlaceholder("Config Commands 🛠️")
                .addOptions([
                    {
                        label: "disableautorole",
                        description: "disable the autorole feature",
                        value: "disableautorole",
                    },
                    {
                        label: "enableautorole",
                        description: "enable the autorole feature",
                        value: "enableautorole",
                    },
                    {
                        label: "setautochannel",
                        description: "Set the Autochannel Channel",
                        value: "setautochannel",
                    },
                    {
                        label: "setleavechannel",
                        description: "Set the Leave Channel",
                        value: "setleavechannel",
                    }, 
                    {
                        label: "setwelcomechannel",
                        description: "set the welcome channel",
                        value: "setwelcomechannel",
                    },
                ]),
            )

            const row2 = new ActionRowBuilder()
            .addComponents(
                new SelectMenuBuilder()
                .setCustomId("devonly")
                .setPlaceholder("Devonly Commands 🛠️")
                .addOptions([
                    {
                        label: "blacklist",
                        description: "Blacklist a Member",
                        value: "blacklist",
                    },
                    {
                        label: "removeblacklist",
                        description: "Remove someone from the Blacklist",
                        value: "removeblacklist",
                    },
                ]),

                
            )
            
            client.channels.cache.get("1025687288732196915").send({ content: 'Here all my commands!', components: [row, row1, row2] })
	}
};