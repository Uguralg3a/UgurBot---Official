const translate = require('@iamtraction/google-translate')
const { EmbedBuilder, PermissionsBitField } = require('discord.js')
const client = require('../../index')
const ms = require('ms')
const {hostedBy, everyoneMention} = require('../../config.json');

const { ApplicationCommandType } = require('discord.js')

module.exports= {
    name : 'giveaway',
	description: "create a giveaway.",
	type: ApplicationCommandType.ChatInput,
    options: [
        {
            name: "channel",
            description: "Der Channel für das Giveaway",
            type: 7,
            required: true
        },
        {
            name: "zeit",
            description: "Die Dauer des Giveaways (Beispiel: 1M = eine Minute)",
            type: 3,
            required: true,
            
        },
        {
            name: "gewinner",
            description: "Die Anzahl der Gewinnner",
            type: 4,
            required: true
        },
        {
            name: "preis",
            description: "Der Preis",
            type: 3,
            required: true
        }

    ],
    
    run : async(client, interaction) => {
        if(!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) return interaction.reply('You dont have manage messages permission.')
        
        const channel = interaction.options.getChannel('channel')
        if(!channel) return interaction.reply('Please specify a channel')

        const dauer = interaction.options.getString('zeit')
        if(!dauer) return interaction.reply('please enter a valid duration')

        const winners = interaction.options.getInteger('gewinner')
        if(!winners) return interaction.reply('Please specify an amount of winners')
    

        const prize = interaction.options.getString('preis')
        if(!prize) return interaction.reply('Please sepcify a prize to win')

        client.giveaways.start(channel, {
            duration : ms(dauer),
            prize : prize,
            winnerCount: parseInt(winners),
            hostedBy: hostedBy ? interaction.author : null,
            messages: {
                giveaway: (everyoneMention ? "@everyone\n\n" : '') + "Giveaway",
                giveawayEnd: (everyoneMention ? "@everyone\n\n" : '') + "Giveaway Vorbei",
                timeRemaining: "Zeit verbliebend **{duration}**",
                inviteToParticipate: "Reagiere mit 🎉 um dem Giveaway beizutreten.",
                winMessage: "Herzlichen Glückwunsch {winners}, du hast das Giveaway gewinnen!",
                embedFooter: "Giveaway Zeit!",
                noWinner: "Ich konnte keinen Gewinner Finden",
                hostedBy: `Erstellt von ${interaction.author}`,
                winners: "Gewinner",
                endedAt: 'Endet in',
                units: {
                    seconds: "Sekunden",
                    minutes: "Minuten",
                    hours: 'Stunden',
                    days: 'Tagen',
                    pluralS: false
                }
            },
           
        })
        interaction.reply(`Giveaway startet in ${channel}`)
    }
}