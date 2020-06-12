const Discord = require('discord.js');

exports.run = (client, message, args) => { 
let member = message.author;

 if(!message.member.hasPermission('ADMINISTRATOR')) {
 return message.channel.send(`${message.author} Você não tem permissão para bloquear este canal`)
 } else {
 let every = message.guild.roles.find('name', '@everyone')
 message.channel.overwritePermissions(every, {
 SEND_MESSAGES: false
 })
 message.channel.send(`<:yes:708355295612502087>  **»** Canal bloqueado por **${member.tag}**`)
 }
}
module.exports.help = {
  name: 'lock',
  aliases: ['lock', 'bloquear', 'fechar']
}
