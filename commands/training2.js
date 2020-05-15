const discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

    var memberEmbed = new discord.RichEmbed()
    .setDescription("**:x: Dit is voor Moderatie Team +**")
    .setColor("#20c8d4")
    .setFooter("MADE BY DRR");

    if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send(memberEmbed);

    var training2 = new discord.RichEmbed()
        .setDescription("politie Training")
        .setColor("BLUE")
        .addField("Host", message.author)
        .addField("Co-Host", args[0])
        .addField("Tijd", args[1])
        .addField("Datum", args[2])
        .addField("type", args[3]);

    var trainingChannel = message.guild.channels.find(`name`, "trainingen");
    if (!trainingChannel) return message.guild.send("Het kanaal is niet gevonden.");

    await trainingChannel.send(training2), (trainingChannel.send(`<@&687181607764754444>`));

   return message.channel.send(`> ${message.author}, je hebt de training goed ingevoert!`)

}

module.exports.help = {
    name: "trainingp",
    description: "Maak een politie training aan."
}