const discord = require("discord.js");

module.exports.run = async (bot, message, arguments) => {

    return message.channel.send("Doei!");

}

module.exports.help = {
    name: "doei",
    description: "Laat de bot Doei terug zeggen"
}