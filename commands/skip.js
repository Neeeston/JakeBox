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

    if(message.member.voiceChannel !== message.guild.me.voiceChannel) {
        let embed = new Discord.RichEmbed()
            .setTitle("Ei rapaz, deu erro ai!")
            .setColor("RED")
            .setDescription(`\`\`\`\nEu já estou em outro canal!\`\`\``)
        return message.channel.send(embed);
    }

    ops.active.set(message.guild.id, fetched);
    fetched.dispatcher.emit("end")
    let embed = new Discord.RichEmbed()
        .setTitle("Sucesso!")
        .setDescription("A música atual foi pulada!")
        .setColor("GREEN")
    await message.channel.send(embed);
}

exports.config = {
    name: "pular",
    aliases: new Array("skip")
}