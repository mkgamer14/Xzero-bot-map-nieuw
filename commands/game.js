const discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

    try {

        var text = "Dit is de game link: SOON";

        message.author.send(text)

    } catch (error) {
        message.channel.send("Er is iets fout gegaan");
    }

}

module.exports.help = {
    name: "game",
    description: "Geef de gamelink."
}