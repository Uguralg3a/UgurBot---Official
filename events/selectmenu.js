const client = require('../index')

client.on('interactionCreate', async interaction => {
	if (!interaction.isSelectMenu()) return;

	if (interaction.customId === 'birthday') {
		if(interaction.values == "checkbirthday") {
            interaction.reply({content: "> Check Birthday\n🔷 With `/checkbirthday` you can check the birthday from a user!", ephemeral: true})
        } else if(interaction.values == "setbirthday") {
            interaction.reply({content: "> Set Birthday\n🔷 With `/setbirthday` you can set your birthday!!", ephemeral: true})
        } 
	} else if(interaction.customId === 'config') {
        if(interaction.values == "disableautorole") {
            interaction.reply({content: "> Disable Autorole\n🔷 With `/disableautorole` you can disable the Autorole feature!", ephemeral: true})
        } else if(interaction.values == "enableautorole") {
            interaction.reply({content: "> Enable Autorole\n🔷 With `/enableautorole` you can enable the Autorole feature!", ephemeral: true})
        } else if(interaction.values == "setautochannel") {
            interaction.reply({content: "> Set Autochannel\n🔷 With `/setautochannel` you can set the Autochannel!", ephemeral: true})
        } else if(interaction.values == "setleavechannel") {
            interaction.reply({content: "> Set Leavechannel\n🔷 With `/setleavechannel` you can set the Leavechannel!", ephemeral: true})
        }  else if(interaction.values == "setwelcomechannel") {
            interaction.reply({content: "> Set Welcomechannel\n🔷 With `/setwelcomechannel` you can set the Welcomechannel!", ephemeral: true})
        }
    } else if(interaction.customId === 'devonly') {
        if(interaction.values == "blacklist") {
            interaction.reply({content: "> Blacklist\n🔷 With `/blacklist` you can blacklist a Member from my commands!", ephemeral: true})
        } else if(interaction.values == "removeblacklist") {
            interaction.reply({content: "> Remove Blacklist\n🔷 With `/removeblacklist` you can remove a Member from my Blacklist!", ephemeral: true})
        }
    } else if(interaction.customId === 'fun') {
        if(interaction.values == "8ball") {
            interaction.reply({content: "> 8ball\n🔷 With `/8ball` you can get random answers to your questions!", ephemeral: true})
        } else if(interaction.values == "meme") {
            interaction.reply({content: "> Meme\n🔷 With `/meme` you can get random Memes!", ephemeral: true})
        } else if(interaction.values == "say") {
            interaction.reply({content: "> Say\n🔷 With `/say` you can get say something and the bot repeats it!", ephemeral: true})
        } else if(interaction.values == "translate") {
            interaction.reply({content: "> Translate\n🔷 With `/translate` you can translate something!", ephemeral: true})
        }
    } else if(interaction.customId === 'giveaway') {
        if(interaction.values == "end") {
            interaction.reply({content: "> End Giveaway\n🔷 With `/end` you can end a giveaway!", ephemeral: true})
        } else if(interaction.values == "giveaway") {
            interaction.reply({content: "> Create a Giveaway\n🔷 With `/giveaway` you can create a Giveaway!", ephemeral: true})
        } else if(interaction.values == "reroll") {
            interaction.reply({content: "> Reroll a Giveaway\n🔷 With `/reroll` you can reroll a Giveaway!", ephemeral: true})
        }
    } else if(interaction.customId === 'moderation') {
        if(interaction.values == "ban") {
            interaction.reply({content: "> Ban a Member\n🔷 With `/ban` you can ban a Member!", ephemeral: true})
        } else if(interaction.values == "kick") {
            interaction.reply({content: "> Kick a Member\n🔷 With `/kick` you can kick a Member!", ephemeral: true})
        } else if(interaction.values == "mute") {
            interaction.reply({content: "> Mute a Member\n🔷 With `/mute` you can Mute a Member!", ephemeral: true})
        } else if(interaction.values == "removeallwarns") {
            interaction.reply({content: "> Remove all Warns\n🔷 With `/removeallwarns` you can remove all warns from a Member!", ephemeral: true})
        } else if(interaction.values == "removewarn") {
            interaction.reply({content: "> Remove a Warn\n🔷 With `/removewarn` you can remove a Warn from a Member!", ephemeral: true})
        } else if(interaction.values == "tempmute") {
            interaction.reply({content: "> Tempmute a Member\n🔷 With `/tempmute` you can tempmute a Member!", ephemeral: true})
        } else if(interaction.values == "unban") {
            interaction.reply({content: "> Unban a Member\n🔷 With `/unban` you can unban a Member!", ephemeral: true})
        } else if(interaction.values == "unmute") {
            interaction.reply({content: "> Unmute a Member\n🔷 With `/unmute` you can unmute a Member!", ephemeral: true})
        } else if(interaction.values == "warn") {
            interaction.reply({content: "> Warn a Member\n🔷 With `/warn` you can warn a Member!", ephemeral: true})
        } else if(interaction.values == "warns") {
            interaction.reply({content: "> Warns List\n🔷 With `/warns` you can get the warns from a Member!", ephemeral: true})
        } 
    }
})