const discord = require("discord.js");
 
module.exports.run = async (bot, message, args) => {

    var memberEmbed = new discord.RichEmbed()
    .setDescription("**:x: Dit is voor Support Team**")
    .setColor("#20c8d4")
    .setFooter("MADE BY DRR");

    if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send(memberEmbed);

    // Id van category van tickets.
    const categoryId = "647823282736988200"; 
    // Als bericht in ticket kanaal is dan verwijder kanaal ander zend bericht
    if (message.channel.parentID == categoryId) {
 
        message.channel.delete();
 
    } else {
 
        message.channel.send(author, "dit commando in een ticket kanaal te doen.");
 
    }
 
  var embedCloseTicket = new discord.RichEmbed()
        .setTitle("Hoi, " + message.channel.name)
        .setDescription("Uw ticket is gemarkeerd als **compleet**. Wil je een nieuwe maken doe dan !ticket")
        .setFooter("ticket gesloten")
        .setColor("#0000ff");
 
    // Vind kanaal voor de logs.
    var logChannel = message.guild.channels.find("name", "logs");
    if (!logChannel) return message.channel.send("Kanaal bestaat niet");
 
    logChannel.send(embedCloseTicket);
 
}
 
module.exports.help = {
    name: "close",
    description: "Sluit een ticket af"
}