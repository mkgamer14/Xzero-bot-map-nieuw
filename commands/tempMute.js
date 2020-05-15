const discord = require("discord.js");
const ms = require("ms");

module.exports.run = async (bot, message, arguments) => {

    // !tempmute gebruiker 1h

    var memberEmbed = new discord.RichEmbed()
    .setDescription("**:x: Dit is voor Moderatie Team +**")
    .setColor("#20c8d4")
    .setFooter("MADE BY DRR");

    if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send(memberEmbed);

    var user = message.guild.member(message.mentions.users.first() || message.guild.members.get(arguments[0]));

    var userEmbed = new discord.RichEmbed()
    .setDescription("**!tempmute [Gebruiker] [Tijd]**")
    .setColor("#20c8d4")
    .setFooter("MADE BY DRR");

    if (!user) return message.channel.send(userEmbed);

    var foutEmbed = new discord.RichEmbed()
    .setDescription("**:x: Deze persoon kan je niet muten**")
    .setColor("#20c8d4")
    .setFooter("MADE BY DRR");

    if (user.hasPermission("MANAGE_MESSAGES")) return message.channel.send(foutEmbed);

    var muteRole = message.guild.roles.find("name", "Muted");

    if (!muteRole) return message.channel.send("De rol muted bestaat niet");

    var muteTime = arguments[1];

    if (!muteTime) return message.channel.send("Geef een tijd op");

    await (user.addRole(muteRole.id));

    message.channel.send(`${user} is gemuted voor ${muteTime}`);

    setTimeout(function () {

        user.removeRole(muteRole.id)

        message.channel.send(`${user} is geunmuted.`);

    }, ms(muteTime));

}

module.exports.help = {
    name: "tempmute",
    description: "Tempmute een gebruiker"
}