const { EmbedBuilder, PermissionsBitField } = require('discord.js')
const client = require('../../index')
const ms = require('ms')
const {hostedBy, everyoneMention, giveawayhostedby} = require('../../config.json');

const { ApplicationCommandType } = require('discord.js')
const {giveawaynochannel, giveawaynotime, giveawaynoamountofwinners, giveawaynoprice, giveawaytimeremaining, giveawayreacttoplay, giveawaywinmessage, giveawayfooter, giveawaynowinner, giveawaywinners, giveawayendat, noperm} = require('../../messages.json')

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
        if(!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) return interaction.reply(noperm)
        
        const channel = interaction.options.getChannel('channel')
        if(!channel) return interaction.reply(giveawaynochannel)

        const dauer = interaction.options.getString('zeit')
        if(!dauer) return interaction.reply(giveawaynotime)

        const winners = interaction.options.getInteger('gewinner')
        if(!winners) return interaction.reply(giveawaynoamountofwinners)
    

        const prize = interaction.options.getString('preis')
        if(!prize) return interaction.reply(giveawaynoprice)

        client.giveaways.start(channel, {
            duration : ms(dauer),
            prize : prize,
            winnerCount: parseInt(winners),
            hostedBy: hostedBy ? interaction.author : null,
            messages: {
                giveaway: (everyoneMention ? "@everyone\n\n" : '') + "Giveaway",
                giveawayEnd: (everyoneMention ? "@everyone\n\n" : '') + "Giveaway Vorbei",
                timeRemaining: giveawaytimeremaining.replace("<duration>", "{duration}"),
                inviteToParticipate: giveawayreacttoplay,
                winMessage: giveawaywinmessage.replace("<winners>", "{winners}"),
                embedFooter: giveawayfooter,
                noWinner: giveawaynowinner,
                hostedBy: giveawayhostedby.replace("<user>", interaction.author),
                winners: giveawaywinners,
                endedAt: giveawayendat,
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