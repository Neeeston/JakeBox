const Discord = require('discord.js');

const ownerID = ["361977144445763585", "236167700777271297"]

exports.run = async (client, message, args) => {
    if(message.author.id != ownerID[0] && message.author.id != ownerID[1]) return message.reply("nope! :hammer_pick:")

    let code = args.join(" ");

    try {
        let embed = new Discord.RichEmbed()
        .setTitle("Output: ")
        .setColor("GREEN")
        .setDescription(`\`\`\`js\n${eval(code)}\`\`\``)
        message.channel.send(embed);
    } catch (e) {
        let embed = new Discord.RichEmbed()
        .setTitle("Ei rapaz, deu erro ai!")
        .setDescription(`\`\`\`js\n${e}\`\`\``)
        .setColor("RED")
        message.channel.send(embed)
    }
}

exports.config = {
    name:"eval",
    aliases: [""]
}