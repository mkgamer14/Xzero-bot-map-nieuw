const discord = require("discord.js");
const fs = require("fs");

const warns = JSON.parse(fs.readFileSync("./warnings.json", "utf8"));

module.exports.run = async (bot, message, args) => {

    // !warn gebruiker uqdsqusduqgufgus fggqysfgyq

    var memberEmbed = new discord.RichEmbed()
    .setDescription("**:x: Dit is voor Moderatie Team +**")
    .setColor("#20c8d4")
    .setFooter("MADE BY DRR");

    if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send(memberEmbed);

    var user = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));

    var userEmbed = new discord.RichEmbed()
    .setDescription("**!warn [Gebruiker] [Reden]**")
    .setColor("#20c8d4")
    .setFooter("MADE BY DRR");

    if (!user) return message.channel.send(userEmbed);

    

    var reason = args.join(" ").slice(22);

    var reasonEmbed = new discord.RichEmbed()
    .setDescription("**:x: Geef een redenen op.**")
    .setColor("#20c8d4")
    .setFooter("MADE BY DRR");

    if (!reason) return message.channel.send(reasonEmbed);

    if (!warns[user.id]) warns[user.id] = {
        warns: 0
    };

    warns[user.id].warns++;

    fs.writeFile("./warnings.json", JSON.stringify(warns), (err) => {
        if (err) console.log(err);
    });

    var warnEmbed = new discord.RichEmbed()
        .setDescription("**warn**")
        .setColor("ee0000")
        .addField("**gebruiker**", user)
        .addField("**Admin**", message.author)
        .addField("**Aantal warns**", warns[user.id].warns  + "/5")
        .addField("**Reden**", reason);

    var warnChannel = message.guild.channels.find(`name`, "logs");
    if (!warnChannel) return message.guild.send("Kan het kanaal niet vinden");

    user.send(warnEmbed)

    warnChannel.send(warnEmbed);

    if (warns[user.id].warns == 1) {

        var warnbericht = new discord.RichEmbed()
            .setDescription("Gebruiker," + user + " is gewarned!")
            .setColor("ee0000")
            .addField("Bericht ", "Gebruiker is succesvol gewarned")
            .addField("Nieuw aantal warns", warns[user.id].warns  + "/5")
            .setTimestamp();

        message.channel.send(warnbericht);

    } else if (warns[user.id].warns == 2) {

        var warnbericht = new discord.RichEmbed()
            .setDescription("Gebruiker," + user + " is gewarned!")
            .setColor("ee0000")
            .addField("Bericht ", "Gebruiker is succesvol gewarned")
            
            .addField("Nieuw aantal warns", warns[user.id].warns  + "/5")
            .setTimestamp();

        message.channel.send(warnbericht);

    } else if (warns[user.id].warns == 3) {

        var warnbericht = new discord.RichEmbed()
            .setDescription("Gebruiker," + user + " is gewarned!")
            .setColor("ee0000")
            .addField("Bericht ", "Gebruiker is succesvol gewarned")
            
            .addField("Nieuw aantal warns", warns[user.id].warns  + "/5")
            .setTimestamp();

        message.channel.send(warnbericht);

    } else if (warns[user.id].warns == 4) {

        var warnbericht = new discord.RichEmbed()
            .setDescription("Gebruiker," + user + " is gewarned!")
            .setColor("ee0000")
            .addField("Bericht ", "Gebruiker is succesvol gewarned")
            .addField("Nieuw aantal warns", warns[user.id].warns  + "/5")
            .setTimestamp();

        message.channel.send(warnbericht);

    } else if (warns[user.id].warns == 5) {

        message.guild.member(user).kick(reason);
        message.channel.send(`${user} is gekicked!`);
        
        
    }

 

}

module.exports.help = {
    name: "warn",
    description: "Geef iemand een warn"
}