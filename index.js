
  
const discord = require("discord.js");
const botConfig = require("./botconfig.json");
const levelfile = require("./data/levels.json");

const fs = require("fs");

const bot = new discord.Client();
bot.commands = new discord.Collection();

fs.readdir("./commands/", (err, files) => {

    if (err) console.log(err);

    var jsFiles = files.filter(f => f.split(".").pop() === "js");

    if (jsFiles.length <= 0) {
        console.log("Kon geen files vinden");
        return;
    }

    jsFiles.forEach((f, i) => {

        var fileGet = require(`./commands/${f}`);
        console.log(`De file ${f} is geladen`);

        bot.commands.set(fileGet.help.name, fileGet);

    })
});

bot.on("ready", async () => {

    console.log(`${bot.user.username} is online!`)

    bot.user.setActivity("DRR | Dutch Reality Roleplay | !help", { type: "STREAMING" });

});

bot.on("guildMemberAdd", member => {

    var role = member.guild.roles.find("name", "Community Member")
   
    if (!role) return;  
   
    member.addRole(role);
   
     const channel = member.guild.channels.find("name", "algemeen");
   
   
});

bot.on("guildMemberAdd", member => {

    const channel = member.guild.channels.find("name", "algemeen");
    if (!channel) console.log("Kan het kanaal niet vinden.");

    var joinEmbed = new discord.RichEmbed()
        .setAuthor(`${member.user.tag}`, member.user.displayAvatarURL)
        .setTitle("Gebruiker gejoined.")
        .setDescription(`Hoi ${member.user.username}, **Welkom op de server**. Je bent altijd welkom.`)
        .setColor("#00FF00")
        .setTimestamp()
        .setFooter("Bot gemaakt door DRP | Delft RolePlay Directie Team");

    channel.send(joinEmbed);

});

//bot.on("guildMemberRemove", member => {

    //const channel = member.guild.channels.find("name", "berichten-logs");
    //if (!channel) console.log("Kan het kanaal niet vinden")
    
    //var joinEmbed = new discord.RichEmbed()
        //.setAuthor(`${member.user.tag}`, member.user.displayAvatarURL)
        //.setDescription(`${member.user.username} jammer dat je weg gaat.`)
        //.setColor("#FF0000")
        //.setTimestamp()
        //.setFooter("Gebruiker Geleaved.");
        
    //channel.send(joinEmbed);

//});


// var swearWords = ["fuck","kanker","mongool","hoer","cancer",""]

bot.on("message", async message => {

    // Als bot bericht stuurt stuur dan return.
    if (message.author.bot) return;

    if (message.channel.type === "dm") return;

    var prefix = botConfig.prefix;

    var messageArray = message.content.split(" ");

    command = messageArray[0];

    var arguments = messageArray.slice(1);

    var commands = bot.commands.get(command.slice(prefix.length));

    if (commands) commands.run(bot, message, arguments);

    const levelfile = require("./data/level.json");

    // Genereer random xp.
    var randomxp = Math.floor(Math.random(1) * 15) + 1;

    // Verkrijg id van de gebruiker.
    var idUser = message.author.id;

    // console.log(randomxp);

    // Als persoon nog niet in file is maak dan standaard aan.
    if (!levelfile[idUser]) {

        levelfile[idUser] = {

            xp: 0,
            level: 0

        };

    }

    // Voeg xp toe.
    levelfile[idUser].xp += randomxp;

    // Verkrijg level van de gebruiker.
    var levelUser = levelfile[idUser].level;
    // Verkrijg xp van de gebruiker.
    var xpUser = levelfile[idUser].xp;
    // Bereken volgend level op basis van de xp.
    var nextLevelXp = levelUser * 300;

    // Als het level 0 is zet dan xp op 100.
    if (nextLevelXp === 0) nextLevelXp = 100;

    console.log(nextLevelXp + " " + xpUser);

    // Als gebruikeer volgend level heeft bereikt zet level 1 hoger en zet in file.
    // Let op Nodemon restart wegens dat we de file als require hebben binnengehaald.
    if (xpUser >= nextLevelXp) {

        levelfile[idUser].level += 1;

        // Wegschrijven van data. Je kan dit ook altijd opslaan maar dit zorgt ervoor dat het data
        // verkeer te groot wordt.
        fs.writeFile("./data/level.json", JSON.stringify(levelfile), err => {

            if (err) console.log(err);

        });

        // Zenden van een embed met gegevens.
        var embedLevel = new discord.RichEmbed()
            .setDescription("***Level hoger***")
            .setColor("#29e53f")
            .addField("Nieuw level: ", levelfile[idUser].level)
            .setAuthor(message.author.username)
            .setTimestamp()
            .setFooter("Gefeliciteerd!");

        message.channel.send(embedLevel);

    }

    // var msg = message.content.toLowerCase();

    // for (var i = 0; i < swearWords.length; i++) {

    //  if (msg.includes(swearWords[i])) {

    //  message.delete();

    //  return message.channel.send("Gelieve niet te vloeken").then(msg => msg.delete(5000));

    //  }


    var swearWords = JSON.parse(fs.readFileSync("./data/swearWord.json"));

    var msg = message.content.toLowerCase();

    for (var i = 0; i < swearWords["vloekWoorden"].length; i++) {

        if (msg.includes(swearWords["vloekWoorden"][i])) {

            message.delete();

            return message.channel.send("> :x: Niet te vloeken A.U.!").then(msg => msg.delete(5000));

        }

    }
    

});

bot.login(botConfig.token);
