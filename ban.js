const Discord = require('discord.js');
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')

const adapter = new FileSync('database.json')
const db = low(adapter);

db.defaults({ histoires : []})
.write()

const client = new Discord.Client();

var prefix = "s!";
var token ="NDQ0NTg1Njk1MTc3MzQyOTgw.DeHA4Q.jkZ34-lFib0Ofu5mlDXHKIAkq0s";

client.on("ready", async () => {
    console.log("Bot prêt a utilisé !");


if(message.content.startsWith(prefix +'ban')){
  if (message.channel.type === "dm") return;
  if(!message.guild.member(message.author).hasPermission("BAN_MEMBERS"))  return message.reply("**:x: Vous n'avez pas la permission !**").catch(console.error);
  if(message.mentions.users.size === 0) {
    return message.channel.send("**:x: Vous devez mentionner un membre a ban pour que cette commande fonctionne !**");
  }
  let banMember = message.guild.member(message.mentions.users.first());
  if(!banMember) {
    return message.channel.send("**:x: Je ne suis pas sur que cet utilisateur existe...**");
  }
  if(!message.guild.member(client.user).hasPermission("BAN_MEMBERS")) {
    return message.reply("**:x: Je n'ai pas la permission pour bannir.**").catch(console.error);
  }
           
  banMember.ban().then(member => {
      const embed = new Discord.RichEmbed()
       .setColor("#ffa500")
       .addField("Utilisateur Ban", "Un utilisateur a été banni " + member.user.tag)
       .addField("Modérateurs ou Administrateur qui a ban : ", `${message.author}`)
       .addField("Heure du ban : ", message.createdAt)
       .addField("Channel du ban : ", message.channel)
       message.member.guild.channels.find("name", "logs").send(embed)
      message.delete();
      });
 }});