const discord = require("discord.js");

module.exports.run = async (bot, message, arguments) => {

    // !clear 21

    if (!message.member.hasPermissions("MANAGE_MESSAGES")) return message.reply("> :X: U heeft niet de juiste permissies!");

    if (!arguments[0]) return message.reply("Je moet eerst een aantal opgeven.");

    if (Number.isInteger(parseInt(arguments[0]))) {

        var amount = parseInt(arguments[0]) + 1;

        message.channel.bulkDelete(amount).then(() => {

            if (arguments[0] == 0) {

                message.channel.send("Ik kan geen 0 berichten verwijderen").then(msg => msg.delete(5000));

            } else if (arguments[0] == 1) {

                message.channel.send(`Ik heb 1 bericht verwijderd.`).then(msg => msg.delete(5000));

            } else {

                message.channel.send(`Ik heb ${arguments[0]} berichten verwijderd.`).then(msg => msg.delete(5000));

            }
        });

    } else {
        return message.channel.send("Geef een getal op.");
    }

}

module.exports.help = {
    name: "clear",
    description: "Doe een aantal berichten weg"
}