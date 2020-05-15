const discord = require("discord.js");

module.exports.run = async (bot, message, arguments) => {

    var botIcon = bot.user.displayAvatarURL;

    var botEmbed = new discord.RichEmbed()
        .setDescription("Discord bot info")
        .setColor("#ff0000")
        .setThumbnail(botIcon)
        .addField("Bot naam", bot.user.username)
        .addField("Gemaak op", bot.user.createdAt);

        
    return message.channel.send(botEmbed);
     Author.send(botEmbed)

    

}

module.exports.help = {
    name: "info",
    description: "Krijg de info van de bot"
}