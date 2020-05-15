const discord = require("discord.js");
const fs = require("fs");

const staffwarns = JSON.parse(fs.readFileSync("./staffwarnings.json", "utf8"));

module.exports.run = async (bot, message, args) => {

    // !staffwarn gebruiker uqdsqusduqgufgus fggqysfgyq

    if (!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send("U kan dit niet doen!");

    var user = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));

    if (!user) return message.channel.send("Geef een gebruiker op of de gebruiker is niet op deze server");

    

    var reason = args.join(" ").slice(22);

    if (!reason) return message.channel.send("Geef een redenen op.");

    if (!staffwarns[user.id]) staffwarns[user.id] = {
        staffwarns: 0
    };

    staffwarns[user.id].staffwarns++;

    fs.writeFile("./staffwarnings.json", JSON.stringify(staffwarns), (err) => {
        if (err) console.log(err);
    });

    var staffwarnEmbed = new discord.RichEmbed()
        .setDescription("**staffwarn**")
        .setColor("ee0000")
        .addField("**gebruiker**", user)
        .addField("**Admin**", message.author)
        .addField("**Aantal staffwarns**", staffwarns[user.id].staffwarns  + "/3")
        .addField("**Reden**", reason);

    var staffwarnChannel = message.guild.channels.find(`name`, "crew-waarschuwingen");
    if (!staffwarnChannel) return message.guild.send("Kan het kanaal niet vinden");

    user.send(staffwarnEmbed)

    staffwarnChannel.send(staffwarnEmbed);

    if (staffwarns[user.id].staffwarns == 1) {

        var staffwarnbericht = new discord.RichEmbed()
            .setDescription("Gebruiker," + user + " is gestaffwarned!")
            .setColor("ee0000")
            .addField("Bericht ", "Gebruiker is succesvol gestaffwarned");

        message.channel.send(staffwarnbericht);

    } else if (staffwarns[user.id].staffwarns == 2) {

        var staffwarnbericht = new discord.RichEmbed()
            .setDescription("Gebruiker," + user + " is gestaffwarned!")
            .setColor("ee0000")
            .addField("Bericht ", "Gebruiker is succesvol gestaffwarned");

        message.channel.send(staffwarnbericht);

    } else if (staffwarns[user.id].staffwarns == 3) {

        message.guild.member(user).kick(reason);
        message.channel.send(`${user} > U mag zich melden bij het Management team!`);
        
        
    }

 

}

module.exports.help = {
    name: "staffwarn",
    description: "Geef iemand een staffwarn"
}