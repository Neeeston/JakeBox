const Discord = require('discord.js');
const client = new Discord.Client();
const active = new Map();

const {token, prefix} = require("./config.json");

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();

const fs = require('fs');
fs.readdir('./commands/', (err, files) => {
    if(err) console.log(err)
    let jsFile = files.filter(f => f.split('.').pop() === 'js')
    if(jsFile.length <= 0){
        console.log('[WARN] Não foi possível achar comandos')
        return;
    }

    jsFile.forEach((f) => {
        let pull = require(`./commands/${f}`)
        console.log(`[LOAD] ${f} foi carregado com sucesso!`)
        client.commands.set(pull.config.name, pull)
        pull.config.aliases.forEach(alias => {
            client.aliases.set(alias, pull.config.name)
        });
    });
});

client.on("ready", async () => {
    console.log("[WOKE] Ready!");
});

client.on("message", async message => {

    function jakeReply(content, prefix) {
        if (!prefix) {
            message.channel.send(message.author + " " + content);
        } else {
            message.channel.send(prefix + " **|** " + message.author + " " + content);
        }
    }

    if(message.author.bot) return;

    if(message.content.startsWith("<@!720693867661230212>")) {
        let embed = new Discord.RichEmbed()
        .setTitle("Hi, i'm Jake!")
        .setDescription(`Howdy, i'm Jake, a music bot for Discord! I'm playing musics to ${client.guilds.size} guilds and to ${client.users.size} users!`)
        .setColor("GREEN")
        message.channel.send(embed)
    }

    if(!message.content.startsWith(prefix)) return;

    let messageArray = message.content.split(/ +/);
    let command = messageArray[0];
    let args = messageArray.slice(1);
    let ops = {
        active: active
    }

    let commandFile = client.commands.get(command.slice(prefix.length)) || client.commands.get(client.aliases.get(command.slice(prefix.length)));
    if(commandFile) commandFile.run(client, message, args, ffReply, ops);

});

client.login(token);
