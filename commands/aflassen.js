const discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

    if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("> :X: U heeft niet de juiste permissies!");

    var reason = args.join(" ");

    var aflasEmbed = new discord.RichEmbed()
        .setDescription("**Training afgelast**")
        .setColor("#ee0000")
        .addField("Afgelast door", message.author)
        .addField("Reden", reason);

    if (!reason) return message.channel.send("Gelieve een reden mee te geven");

    var aflasChannel = message.guild.channels.find(`name`, "trainingen");
    if (!aflasChannel) return message.guild.send("Het kanaal is niet gevonden.");

    await aflasChannel.send(aflasEmbed), (aflasChannel.send(`<@&650963527749730324>`)).then(message.delete);

}

module.exports.help = {
    name: "aflassen",
    description: ""
}