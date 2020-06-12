const Discord = require('discord.js');
const ownerID = "236167700777271297";

exports.run = async (client, message, args) => {
    if(message.author.id != ownerID) return message.reply("nope! :hammer_pick:");

    let command = args[0];

    if(!command) {
        message.channel.send("cadê o comando? nn sei");
        return;
    }

    let commandName = command.toLowerCase() + ".js";

    try {
        delete require.cache[require.resolve(`./${commandName}`)]
        client.commands.delete(commandName);
        const pull = require(`./${commandName}`);
        client.commands.set(commandName, pull);
    } catch (err) {
        let embed = new Discord.RichEmbed()
            .setTitle("Ei rapaz, deu erro ai!")
            .setDescription(`\`\`\`js\n${err}\`\`\``)
            .setColor("RED")
            .setFooter("Algum argumento está inválido, verifique a gramática!")
        return message.channel.send(embed);
    };

    const d = new Date()

    const cliSpinners = require('cli-spinners');


    let embed = new Discord.RichEmbed()
     .setTitle("Sucesso!")
     .setDescription(`\`\`\`js\nOutput: ${commandName} foi recarregado com sucesso!\`\`\``)
     .setFooter("Para recarregar mais comandos digite: !reload <comando>")
     .setColor("GREEN")
    message.channel.send(embed)



}

exports.config = {
    name:"reload",
    aliases: [""]
}