const Discord = require('discord.js');

exports.run = async (client, message, args) => {
    let embed = new Discord.RichEmbed()
        .setTitle(`${Math.round(client.ping)}ms`)
        .setColor("GREEN")
    await message.channel.send(embed);
}

exports.config = {
    name:"ping",
    aliases: [""]
}