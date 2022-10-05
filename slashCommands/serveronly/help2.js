const { ApplicationCommandType,EmbedBuilder, ActionRowBuilder, SelectMenuBuilder  } = require('discord.js');
const color = require("../../color.json")

module.exports = {
	name: 'help2',
	description: "help.",
	type: ApplicationCommandType.ChatInput,
	cooldown: 3000,
  

    /**
     * 
     * @param {Client} client 
     * @param {interaction} interaction 
     */
	run: async (client, interaction) => {
        const row3 = new ActionRowBuilder()
            .addComponents(
                new SelectMenuBuilder()
                .setCustomId("fun")
                .setPlaceholder("Fun Commands 😃")
                .addOptions([
                    {
                        label: "8ball",
                        description: "8ball",
                        value: "8ball",
                    },
                    {
                        label: "meme",
                        description: "get a random meme",
                        value: "meme",
                    },
                    {
                        label: "say",
                        description: "Say something",
                        value: "say"
                    },
                    {
                        label: "translate",
                        description: "Translate something",
                        value: "translate" 
                    }
                ]),
            )

            const row4 = new ActionRowBuilder()
            .addComponents(
                new SelectMenuBuilder()
                .setCustomId("giveaway")
                .setPlaceholder("Giveaway Commands 🎉")
                .addOptions([
                    {
                        label: "end",
                        description: "End a giveaway",
                        value: "end",
                    },
                    {
                        label: "giveway",
                        description: "create a giveaway",
                        value: "giveaway",
                    },
                    {
                        label: "reroll",
                        description: "Reroll a giveway",
                        value: "reroll"
                    }
                ]),
            )

            const row5 = new ActionRowBuilder()
            .addComponents(
                new SelectMenuBuilder()
                .setCustomId("moderation")
                .setPlaceholder("Moderation Commands 🔨")
                .addOptions([
                    {
                        label: "ban",
                        description: "Ban a Member",
                        value: "ban",
                    },
                    {
                        label: "kick",
                        description: "kick a Member",
                        value: "kick",
                    },
                    {
                        label: "mute",
                        description: "mute a Member",
                        value: "mute",
                    },
                    {
                        label: "removeallwarns",
                        description: "Remove all warns from a Member",
                        value: "removeallwarns",
                    },
                    {
                        label: "removewarn",
                        description: "Remove a Warn from a Member",
                        value: "removewarn",
                    },
                    {
                        label: "tempmute",
                        description: "Tempmute a Member",
                        value: "tempmute",
                    },
                    {
                        label: "unban",
                        description: "Unban a Member",
                        value: "unban",
                    },
                    {
                        label: "unmute",
                        description: "Unmute a Member",
                        value: "unmute",
                    },
                    {
                        label: "warn",
                        description: "Warn a Member",
                        value: "warn",
                    },
                    {
                        label: "warns",
                        description: "Get a list from the warns from a Member",
                        value: "warns",
                    },
                ]),
            )

            client.channels.cache.get("1025687288732196915").send({ components: [row3, row4, row5]})

    }
}