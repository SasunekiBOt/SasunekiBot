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

if(message.content.startsWith(prefix +'kick')){
  if (message.channel.type === "dm") return;
  if(!message.guild.member(message.author).hasPermission("KICK_MEMBERS"))  return message.reply("**:x: Vous n'avez pas la permission `admin` dans ce serveur**").catch(console.error);
  if(message.mentions.users.size === 0) {
    return message.channel.send("**:x: Vous devez mentionner un membre a kick pour que cette commande fonctionne !**");
  }
  let kickMember = message.guild.member(message.mentions.users.first());
  if(!kickMember) {
    return message.channel.send("**:x: Je ne suis pas sur que cet utilisateur existe...**");
  }
  if(!message.guild.member(client.user).hasPermission("KICK_MEMBERS")) {
    return message.reply("**:x: Je n'ai pas la permission pour kick...**").catch(console.error);
  }
           
  kickMember.kick().then(member => {
      const embed = new Discord.RichEmbed()
       .setColor("#ffa500")
      .addField("Utilisateur kick", "Un utilisateur a été kick " + member.user.tag)
      .addField("Modérateurs ou Administrateur qui a kick : ", `${message.author}`)
.addField("Heure du kick : ", message.createdAt)
.addField("Channel du kick : ", message.channel)
       message.member.guild.channels.find("name", "logs").sendEmbed(embed)
      message.delete();
          });
          }});