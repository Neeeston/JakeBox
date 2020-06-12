const Discord = require("discord.js");
const ownerID = "236167700777271297";

exports.run = async (client, message, args) => {
    if(message.author.id != ownerID) return message.reply("nope! :hammer_pick:");

    try {
        let embed = new Discord.RichEmbed()
            .setThumbnail("https://cdn.discordapp.com/emojis/540493360348135434.gif?v=1")
            .setTitle("Desligando!")
            .setDescription("O BOT está reiniciando no momento, aguarde!")
            .setColor("GREEN")
        await message.channel.send(embed)
        process.exit();
    } catch (err) {
        let embed = new Discord.RichEmbed()
            .setTitle("Ei rapaz, deu erro ai!")
            .setDescription(`\`\`\`js\n${err}\`\`\``)
            .setColor("RED")
        await message.channel.send(embed)
    }
}

exports.config = {
    name: "shutdown",
    aliases: [""]
}