const {Client, Message, EmbedBuilder, ActionRowBuilder, SelectMenuBuilder} = require('discord.js')

module.exports = {
    name: "help",
    description: "Help",
    run: async(client, interaction) => {
        const directorys = [
            ...new Set(client.slashCommands.map((cmd) => cmd.directory)),
        ];

        const formatString = (str) => {
            `${str[0].toUpperCase()}${str.slice(1).toLowerCase}`
        }

        const categories = directorys.map((dir) => {
            const getCommands = client.slashCommands
            .filter((cmd) => cmd.director === dir)
            .map((cmd) => {
                return {
                    name: cmd.name || "There is no name",
                    description: cmd.description || "There is no description",
                };
            });
            return {
                directory: formatString(dir),
                commands: getCommands,
            };
        });

        const embed = new EmbedBuilder().setDescription("Please choose a category in the dropdown menu")

        const components = (state) => {
            new ActionRowBuilder()
            .addComponents(new SelectMenuBuilder())
            .setCustomId("help-menu")
            .setPlaceholder('Please select a category').
            setDisabled(state)
            .addOptions(categories.map((cmd) => {
                return {
                    label: cmd.directory,
                    value: cmd.directory.toLowerCase(),
                    description: `Commands from ${cmd.directory} category`
                }
            }
            )
            )
                }
                const initialMessage = await interaction.reply({
                    embeds: [embed],
                    components: components(false)
                })

                const filter = (interaction) => 
                interaction.user.id === interaction.user.id

                const collector = interaction.channel.createMessageComponentCollector({
                    filter,
                    componentType: "SELECT_MENU",
                   // time: 5000
                })

                collector.on('collect', (interaction) => {
                    const [ directory] = interaction.values;
                    const category = categories.find(x => x.directory.toLowerCase() === directory)

                    const categoryEmbed = new EmbedBuilder()
                    .setTitle(`${directory} commands`)
                    .setDescription("Here are all my commands")
                    .addFields(
                        categories.slashCommands.map((cmd) => {
                            return {
                                name: `\`${cmd.name}\``,
                                value: cmd.description,
                                inline: true
                            }
                        })
                    )
                    interaction.update({ embeds: [categoryEmbed]})
                })

                collector.on('end', () => {
                    initialMessage.edit({components: components(true)})
                })
    }
}