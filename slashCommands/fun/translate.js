const translate = require('@iamtraction/google-translate')
const { EmbedBuilder } = require('discord.js')
const client = require('../../index')
const { ApplicationCommandType } = require('discord.js')

module.exports= {
    name : 'translate',
	description: "translate.",
	type: ApplicationCommandType.ChatInput,
    options: [
        {
            name: "query",
            description: "Der Text zum Übersetzen",
            type: 3,
            required: true
        },
        {
            name: "sprache",
            description: "Die SPrache zum Übersetzen",
            type: 3,
            required: true,
            /*choices: [
                {
                    name: "Deutsch",
                    value: "de"
                },
                {
                    name: "Englisch",
                    value: "en"
                },
                {
                    name: "Französisch",
                    value: "fr"
                },
                {
                    name: "Abchasisch",
                    value: "ab"
                },
                {
                    name: "Afar",
                    value: "aa"
                },
                {
                    name: "Afrikaans",
                    value: "af"
                },
                {
                    name: "Akan",
                    value: "ak"
                },
                {
                    name: "Albanisch",
                    value: "sq"
                },
                {
                    name: "Altenglisch ",
                    value: "ang"
                },
                {
                    name: "Altgriechisch",
                    value: "grc"
                },
                {
                    name: "Althochdeutsch",
                    value: "goh"
                },
                {
                    name: "Altnordisch",
                    value: "non"
                },
                {
                    name: "Amharisch",
                    value: "am"
                },
                {
                    name: "Arabisch",
                    value: "ar"
                },
                {
                    name: "Bulgarisch",
                    value: "bg"
                },
                {
                    name: "Chinesisch",
                    value: "zh"
                },
                {
                    name: "Dänisch",
                    value: "da"
                },
                {
                    name: "Finnisch",
                    value: "fi"
                },
                {
                    name: "Georgisch",
                    value: "ka"
                },
                {
                    name: "Griechisch ",
                    value: "el"
                },
                {
                    name: "Grönländisch",
                    value: "kl"
                },
                {
                    name: "Hawaiianisch",
                    value: "haw"
                },
                {
                    name: "Hindi",
                    value: "hi"
                },
                {
                    name: "Indonesisch",
                    value: "id"
                },
                {
                    name: "Irisch",
                    value: "ga"
                },
                {
                    name: "Italienisch",
                    value: "it"
                },
                {
                    name: "Japanisch",
                    value: "ja"
                },
                {
                    name: "Latein",
                    value: "la"
                }
            ]*/
        },

    ],
    
    run : async(client, interaction) => {
        try {
            const query = interaction.options.getString('query')
            if(!query) return interaction.reply({ content: 'Bitte gebe an, was du übersetzen willst.'})

            const arg = interaction.options.getString('sprache')

            const translated = await translate(query, { to: `${arg}`})
            const embed = new EmbedBuilder()
            .setTitle("Übersetzt!")
            .addFields(
                {name: "Text: ", value: query},
                {name: "Ausgewählte Sprache: ", value: arg},
                {name: 'Übersetzung: ', value: translated.text}
                )
            .setTimestamp()
            
            
            interaction.reply({embeds: [embed]})
        } catch(error) {
            return interaction.reply({ content: "error"}).then(() => console.log(error))
        }
    }
}