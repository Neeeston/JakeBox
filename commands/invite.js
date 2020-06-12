const Discord = require('discord.js');

exports.run = async (client, message, args) => {
    let invite = "https://discord.com/api/oauth2/authorize?client_id=720693867661230212&permissions=3147776&scope=bot";

    let embed = new Discord.RichEmbed()
    .setThumbnail("https://cdn.discordapp.com/emojis/676471842151858207.gif?v=1")
    .setTitle("Me adicione no seu servidor!")
    .setColor("GREEN")
    .setDescription(`Clique [aqui](${invite}) para me adicionar no seu servidor!`);
    message.channel.send(embed);
}

exports.config = {
    name:"invite",
    aliases: new Array("convidar", "add")
}