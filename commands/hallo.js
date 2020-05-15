const discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

    if(!message.member.roles.some(r=>["Training mention"].includes(r.name)) ) return message.channel.send("reply here");

}

module.exports.help = {
    name: "role",
    description: "krijg Training mention"
}