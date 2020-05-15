module.exports.run = async (bot, message, arguments) => {

    try {

        var text =  message.author.send("> pong: " + (message.createdTimestamp - Date.now()) + "ms");

    

        message.author.send(text)

    } catch (error) {
        message.channel.send("Er is iets fout gegaan");
    }

    

    message.channel.send("pong: " + (message.createdTimestamp - Date.now()) + "ms");

  
}

module.exports.help = {
    name: "ping",
    description: "Krijg pong terug met het aantal ms"
}