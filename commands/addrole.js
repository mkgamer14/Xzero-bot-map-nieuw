const Discord = require("discord.js");
 
module.exports.run = async (bot, message, args) => {
    let memberRole = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if (!memberRole) {
        return message.channel.send("> :x: U moet ook een gebruiker opgeven")
    }
   
    let roleToAdd = args.join(" ").slice(22)
    if(!roleToAdd) return message.channel.send("> Geef een rol op")
    if(!message.member.hasPermission("MANAGE_ROLES")) {
        return message.channel.send("> :x: U kunt dit commando niet uitvoeren");
    }
   
    //if(memberRole.hasPermission("MANAGE_MESSAGES")) {
       // return message.channel.send("> U kunt de rollen van een medewerker niet wijzigen!");
   // }
 
    let role = message.guild.roles.find(`name`, roleToAdd)
    if(!role) return message.channel.send("De opgegeven rol bestaat niet!");
 
    if(memberRole.roles.has(role.id)) return message.channel.send(`De opgegeven gebruiker heeft al de rol ${roleToAdd}!` );
   await memberRole.addRole(role.id)
 
   try {
       await memberRole.send(`> Gefeliciteerd! Jij hebt de rol ${role.name} succesvol`)
   } catch (e) {
       message.channel.send(` De rol ${role.name} is toegewezen aan <@${memberRole.id}>`)
   }
};
 
module.exports.help = {
   name: "addrole"
}