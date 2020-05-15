const discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

    var kickUser = message.guild.member(message.mentions.users.first() || message.guild.member(args[0]));

    if (!kickUser) return message.channel.send("> commado is !kick [Gebruiker] [Reden]");

    var reason = args.join(" ").slice(22);

    if (!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send("> :X: U heeft niet de juiste permissies!");

    if (kickUser.hasPermission("KICK_MEMBERS")) return message.channel.send("Deze gebruiker kan je niet kicken.");

    var kick = new discord.RichEmbed()
        .setDescription("Kick")
        .setColor("#ff9900")
        .addField("kicked gebruiker", kickUser)
        .addField("Gekickd door", message.author)
        .addField("Reden", reason);

        message.kickUser.send(kick)

    var kickChannel = message.guild.channels.find(`name`, "logs");
    if (!kickChannel) return message.guild.send("Het kanaal is niet gevonden.");

    kickUser.send(kick)

    message.guild.member(kickUser).kick(reason);

    kickChannel.send(kick).then(message.delete);

    return;


        

}

module.exports.help = {
    name: "kick",
    v: "Kick een gebruiker"
}