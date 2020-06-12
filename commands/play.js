const Discord = require('discord.js');
const ytdl = require("ytdl-core");

exports.run = async (client, message, args, ops) => {

    if(!message.member.voiceChannel) {
        let embed = new Discord.RichEmbed()
            .setColor("RED")
            .setTitle("Ei rapaz, deu erro ai!")
            .setDescription("```\nVocê não está em um canal de voz!```");
        return message.channel.send(embed)
    }

    let validar = await ytdl.validateURL(args[0]);

    if(!validar) {
        let embed = new Discord.RichEmbed()
            .setTitle("Ei rapaz, deu erro ai!")
            .setColor("RED")
            .setDescription("```\nInsira uma URL válida!```")
        return message.channel.send(embed);
    }

    let info = await ytdl.getInfo(args[0])

    let data = ops.active.get(message.guild.id) || {};

    if(!data.connection) data.connection = await message.member.voiceChannel.join();
    if(!data.queue) data.queue = [];
    data.guildID = message.guild.id;

    data.queue.push({
        songTitle: info.title,
        videoID: info.id,
        requester: message.author.id,
        url: args[0],
        currentChannel: message.channel.id
    });

    if(!data.dispatcher) await play(client, ops, data);
    else {
        let embed = new Discord.RichEmbed()
            .setTitle("Adicionada à playlist: ")
            .setDescription(`[${info.title}](https://www.youtube.com/watch?v=${info.id}) **|** Pedida por [<@!${message.author.id}>]`)
            .setThumbnail("https://media.giphy.com/media/39m1Q3QBRvPiyB4GIy/giphy.gif")
            .setColor("GREEN")
        await message.channel.send(embed)
    }

    ops.active.set(message.guild.id, data);

    async function play(client, ops, data) {
        let embed = new Discord.RichEmbed()
            .setTitle("Tocando agora: ")
            .setDescription(`[${data.queue[0].songTitle}](https://www.youtube.com/watch?v=${data.queue[0].videoID}) **|** Pedida por [<@!${data.queue[0].requester}>]`)
            .setColor("GREEN")
            .setThumbnail("https://i.pinimg.com/originals/c3/c4/d1/c3c4d1f51d7120ae0ef6f5ca62f04ac2.gif");
        client.channels.get(data.queue[0].currentChannel).send(embed)

        data.dispatcher = await data.connection.playStream(ytdl(data.queue[0].url, {filter: "audioonly", quality: "highest"}));
        data.dispatcher.guildID = data.guildID;

        data.dispatcher.once("end", function() {
            finish(client, ops, this)
        });
    }

    async function finish (client, ops, dispatcher) {
        let fetched = ops.active.get(dispatcher.guildID);

        fetched.queue.shift();

        if(fetched.queue.length > 0) {
            ops.active.set(dispatcher.guildID, fetched);
            play(client, ops, fetched);
        } else {
            let voicechannel = client.guilds.get(dispatcher.guildID).me.voiceChannel;
            if (voicechannel) voicechannel.leave();
        }
    }
}

exports.config = {
    name:"tocar",
    aliases: new Array("play", "p", "ply")
}