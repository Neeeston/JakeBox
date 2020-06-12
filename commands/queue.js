const Discord = require('discord.js');

exports.run = async (client, message, args, ops) => {
    let fetched = ops.active.get(message.guild.id);

    let queue = fetched.queue;
    let nowPlaying = queue[0];

    if(!nowPlaying) {
        let embed = new Discord.RichEmbed()
        .setTitle("Ei rapaz, deu erro ai!")
        .setColor("RED")
        .setDescription("```\nNão tem nenhuma música tocando neste momento!```")
        return message.channel.send(embed);
    }

    let resp = `Tocando agora:\n\`${nowPlaying.songTitle}\`\n`

    for (var i = 1; i < queue.length; i++) {
        resp += `\`${i}\` \`${queue[i].songTitle}\``;
    }

    let embed = new Discord.RichEmbed()
        .setColor("GREEN")
        .setDescription(resp)


    await message.channel.send(embed);
}

exports.config = {
    name:"queue",
    aliases: new Array("q", "lista", "playlist")
}