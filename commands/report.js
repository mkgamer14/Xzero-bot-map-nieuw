const discord = require("discord.js");
const botConfig = require("../botconfig.json");

module.exports.run = async (bot, message, args) => {

    // {prefix}report speler reden

    var prefix = botConfig.prefix;

    if (!args[0]) return message.channel.send(`Gebruik het command als volgt: ${prefix}report gebruikersnaam redenen.`)

    var user = message.guild.member(message.mentions.users.first());

    if (!user) return message.channel.send("Speler is niet te vinden / geef een speler op.");

    var reason = args.join(" ").slice(22);

    if (!reason) return message.channel.send("Gelieve een reden op te geven.")

    var reportEmbed = new discord.RichEmbed()
        .setDescription("Reports")
        .setColor("ff0000")
        .addField("Reported gebruiker", `${user} met ID ${user.id}`)
        .addField("Report door", `${message.author} met het id ${message.author.id}`)
        .addField("Reden", reason)
        .setFooter(message.createdAt);

    var channelReport = message.guild.channels.find("name", "reports");
    if (!channelReport) return message.channel.send("Kan het kanaal niet vinden");

    // ZORG VOOR ADMINISTRATOR RECHTEN OP BOT.
    message.delete();

    return channelReport.send(reportEmbed);

}

module.exports.help = {
    name: "report",
    description: "report een gebruiker"
}