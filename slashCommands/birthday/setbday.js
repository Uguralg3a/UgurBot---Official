const { ApplicationCommandType } = require('discord.js');
const Schema = require('../../models/birthday')
const {bdaynoday, bdaynomonth, bdaynorightnumber, bdaywrongformat, bdaysavedas} = require('../../messages.json')


module.exports = {
	name: 'setbirthday',
	description: "setbirthday",
	type: ApplicationCommandType.ChatInput,
	cooldown: 3000, 
    options: [
        {
            "name": "birthday",
            "description": "birthday (Beispiel: 22/2 = 22.Februar)",
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
        const months = {
            1: "January",
            2: "February",
            3: "March",
            4: "April",
            5: "May",
            6: "June",
            7: "July",
            8: "August",
            9: "September",
            10: "October",
            11: "November",
            12: "December"
        }

        const joined = interaction.options.getString('birthday');
        const split = joined.trim().split("/")

	     let [day, month] = split;

    if(!day) return interaction.reply(bdaynoday)
    if(!month) return interaction.reply(bdaynomonth)

    if(isNaN(day) || isNaN(month))
    return interaction.reply(bdaynorightnumber)

    day = parseInt(day);
    month = parseInt(month);

    if(!day || day > 31) return interaction.reply(bdaywrongformat)
    if(!month || month > 12) return interaction.reply(bdaywrongformat)

    
    const convertedDay = suffixes(day);
    const convertedMonth = months[month]
    const birthdayString = `${convertedDay}${convertedMonth}`
    Schema.findOne({User: interaction.user.id, Guild: interaction.guild.id}, async(err, data) => {
        if(data) {
            data.birthday = birthdayString;
            data.save();
        } else {
            new Schema({
                Guild: interaction.guild.id,
                User: interaction.user.id,
                Birthday: birthdayString
            }).save();
        }
    })

    interaction.reply(bdaysavedas.replace("<birthday>", birthdayString))
},
}

/**
* @param {Number} number
*/
function suffixes(number) {
const converted = number.toString();

const lastChar = converted.charAt(converted.length - 1)

return lastChar == "1" 
 ? `${converted}.` 
 : lastChar == "2" 
 ? `${converted}.`
 : lastChar == "3" 
 ? `${converted}.` 
 : `${converted}.`
}