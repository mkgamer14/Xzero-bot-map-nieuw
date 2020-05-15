const discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

    var banUser = message.guild.member(message.mentions.users.first() || message.guild.member(args[0]));

    
    var userEmbed = new discord.RichEmbed()
    .setDescription("**!ban [Gebruiker] [Reden]**")
    .setColor("#20c8d4")
    .setFooter("MADE BY DRP | Delft Roleplay");

 
    if (!banUser) return message.channel.send(userEmbed);

    var reason = args.join(" ").slice(22);

    var reasonEmbed = new discord.RichEmbed()
    .setDescription("**:x: Geef een redenen op.**")
    .setColor("#20c8d4")
    .setFooter("MADE BY DRP | Delft Roleplay");

    if (!reason) return message.channel.send(reasonEmbed);

    var permEmbed = new discord.RichEmbed()
    .setDescription("**:x: U heeft niet de juiste permissies!**")
    .setColor("#20c8d4")
    .setFooter("MADE BY DRP | Delft Roleplay");


    if (!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send(permEmbed);

    var grendsEmbed = new discord.RichEmbed()
    .setDescription("**:x: Deze gebruiker kunt u niet bannen!**")
    .setColor("#20c8d4")
    .setFooter("MADE BY DRP | Delft Roleplay");

    if (banUser.hasPermission("BAN_MEMBERS")) return message.channel.send(grendsEmbed);

    var ban = new discord.RichEmbed()
        .setDescription("ban")
        .setColor("#ff9900")
        .addField("banned gebruiker", banUser)
        .addField("Gebanned door", message.author)
        .addField("Reden", reason);



    var banChannel = message.guild.channels.find(`name`, "logs");
    if (!banChannel) return message.guild.send("Het kanaal is niet gevonden.");

    banUser.send(ban)

    message.guild.member(banUser).ban(reason);


    banChannel.send(ban).then(message.delete);

    var banEmbed = new discord.RichEmbed()
        .setDescription("Banned!")
        .setColor("#ff9900")
        .addField("Gebruiker", banUser + "is succesvol Verbannen");
        

    return message.channel.send(banEmbed)

    return;

    

}

module.exports.help = {
    name: "ban",
    v: "ban een gebruiker"
}