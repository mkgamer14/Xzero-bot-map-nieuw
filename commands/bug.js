const discord = require("discord.js");
 
module.exports.run = async (bot, message, args) => {
 
    // Vang het bug op.
    var bug = args.join(" ");
 
    // Kijk na als er een bug is meegegeven.
    if (!bug) return message.channel.send("Geen bug meegegeven gelieve een bug mee te geven.");
 
    // Maak het embed aan.
    var bugEmbed = new discord.RichEmbed()
        .setTitle("Nieuw bug")
        .setColor("#00FF00")
        .addField("bug: ", bug)
        .addField("Ingezonden door: ", message.author);
 
    // Vind het kanaal.
    var bugChannel = message.guild.channels.find(`name`, "bugs");
    if (!bugChannel) return message.guild.send("Kan het kanaal niet vinden");
 
    // Verzend het bericht en voeg er reacties aan toe.
    bugChannel.send(bugEmbed).then(embedMessage => {
    });
 
    // Einde.
 
}
 
module.exports.help = {
    name: "bug",
    description: "Heb je een bug. Zet het dan hier en misschien passen we het toe."
}