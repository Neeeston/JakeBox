const Discord = require('discord.js');

exports.run = async (client, message, args, ops) => {
    let fetched = ops.active.get(message.guild.id);

    if(!fetched) {
        let embed = new Discord.RichEmbed()
        .setTitle("Ei rapaz, deu erro ai!")
        .setColor("RED")
        .setDescription("```\nNão tem nenhuma música tocando neste momento!```")
        return message.channel.send(embed);
    }

    if(message.member.voiceChannel != message.guild.me.voiceChannel) {
        let embed = new Discord.RichEmbed()
        .setTitle("Ei rapaz, deu erro ai!")
        .setColor("RED")
        .setDescription("```\nVocê não está no mesmo canal que eu!```")
        return message.channel.send(embed);
    }

    if(fetched.dispatcher.paused) {
        let embed = new Discord.RichEmbed()
        .setTitle("Ei rapaz, deu erro ai!")
        .setColor("RED")
        .setDescription("```\nA música já está pausada!```")
        return message.channel.send(embed);
    }

    fetched.dispatcher.pause();

    let embed = new Discord.RichEmbed()
    .setTitle("Sucesso!")
    .setColor("GREEN")
    .setDescription("Música pausada com sucesso!")
    message.channel.send(embed);
}

exports.config = {
    name:"resume",
    aliases: [""]
}