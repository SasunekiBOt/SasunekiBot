const Discord = require('discord.js');
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')

const adapter = new FileSync('database.json')
const db = low(adapter);

db.defaults({ DataBase:  []})
.write()

const client = new Discord.Client();

var prefix = "s!";
var token ="NDQ0NTg1Njk1MTc3MzQyOTgw.DeHA4Q.jkZ34-lFib0Ofu5mlDXHKIAkq0s";

client.on("ready", async () => {
    console.log("Bot prêt a utilisé !");
    client.user.setActivity("SasunekiBot | s!help ");

});

//Bienvenue aurevoir
client.on('guildMemberAdd', function (member) {
    member.createDM().then(function (channel) {
        return channel.send('**Bienvenue sur le serveur ! Amuse toi bien et au plaisir de te voir ! :smiley:**');
    }).catch(console.error)
})

client.on('guildMemberRemove', function (member) {
    member.createDM().then(function (channel) {
        return channel.send('**Au revoir, une bonne continuation à toi, bonne journée :wink:**');
    }).catch(console.error)
})

client.on('message', message => {

        
        if(message.content.startsWith(prefix + 'setConfig')) {
      message.guild.createRole({
          name: 'Mute', 
          color: '#0a0a0a', 
          SEND_MESSAGES: false})
          message.delete()
    }

//ping
    if(message.content === prefix + 'ping') {
        message.channel.send("🏓 **Pong :** `" + `${message.createdTimestamp - Date.now()}` + "ms`")
        message.delete()
    }
    
//avatar    
    if(message.content === prefix + 'avatar') {
        let user = message.mentions.users.first() || message.author;
        
        let embed = new Discord.RichEmbed()
        .setAuthor(`${user.username}`)
        .addField("**Voici ton avatar !**", "_ _")
        .setImage (user.displayAvatarURL)
        .setColor('#ffa500')
        message.channel.send(embed)
        message.delete()
        }
        if(message.content === 'Bonjour') {
            message.channel.send('**Bien le bonjour, comment ça va ? :smiley:**')
        }

         if(message.content === 'Ca va ?') {
            message.channel.send('Bien et toi ?')
            message.delete()

        }
        
        if(message.content.startsWith(`<@${client.user.id}>`)) { 
            message.channel.send("Mon prefix est `" + prefix + "` et j'ai été creer par GlAzKo#0300 !");
            }

        if(!message.content.startsWith(prefix)) return;
        var args = message.content.substring(prefix.length).split(" ");

        switch (args[0].toLowerCase()) {
            
            case "database":
            var value = message.content.substr(10);
            var author = message.author.id;
            var number = db.get('DataBase').map('id').value();
            //var storyid = number + 1;
            console.log(value);
            message.reply("**Ajout de l'histoire à la base de données**")

            db.get('DataBase')
            .push({ story_value: value, story_author: author})
            .write();
            break;

            case "bug":
            var value = message.content.substr(6);
            var author = message.author.id;
            var number = db.get('DataBase').map('id').value();
            //var storyid = number + 1;
            console.log(value);
            message.reply("Merci d'avoir signaler un bug !")

            db.get('DataBase')
            .push({ story_value: value, story_author: author})
            .write();
            break;

            case "listhistoires":

            story_random();
            console.log(randnum);

            var story = db.get(`DataBase[${randnum}].story_value`).toString().value();
            var author_story = db.get(`DataBase[${randnum}].story_author`).toString().value();
            console.log(story);

            message.channel.send(`Voici l'histoires : ${story} (Histoires de ${author_story}`)

            break;

            case "8ball":
            let args = message.content.split(" ").slice(1);
            let tte = args.join(" ")
            if (!tte){    
            return message.reply("Merci de poser une question ! :8ball:")};

            var replys = [
                "Oui",
                "Non",
                "Je sais pas",
                "Peut être",
                "Surement"
            ];

            let reponse = (replys[Math.floor(Math.random() * replys.length)])
            var embed = new Discord.RichEmbed()
            .setColor("#ffa500")
            .setTitle("🦊 SasunekiBot | 8ball")
            .addField("La question est celle ci :", tte)
            .addField("Voici ma réponse :",reponse)
            .setFooter("© SasunekiBot, 2018 | By Glazko")
            message.channel.sendEmbed(embed)
            message.delete()
        }

        //Ban et kick
        if(message.content.startsWith(prefix +'ban')){
            if (message.channel.type === "dm") return;
            let bReason = args.join(" ").slice(22);
            if(!message.guild.member(message.author).hasPermission("BAN_MEMBERS"))  return message.reply("**:warning: | Vous n'avez pas la permission !**").catch(console.error);
            if(message.mentions.users.size === 0) {
              return message.channel.send("**:warning: | Vous devez mentionner un membre a ban pour que cette commande fonctionne !**");
            }
            let banMember = message.guild.member(message.mentions.users.first());
            if(!banMember) {
              return message.channel.send("**:warning: | Je ne suis pas sur que cet utilisateur existe...**");
            }
            if(!message.guild.member(client.user).hasPermission("BAN_MEMBERS")) {
              return message.reply("**:warning: | Je n'ai pas la permission pour bannir.**").catch(console.error);
            }
                     
            banMember.ban().then(member => {
                const embed = new Discord.RichEmbed()
                 .setColor("#ffa500")
                 .addField("Un utilisateur a été ban !", "Un utilisateur a été banni " + member.user.tag)
                 .addField("Modérateurs ou Administrateur qui a ban : ", `${message.author}`)
                 .addField("Raison du ban :",bReason)
                 .addField("Heure du ban : ", message.createdAt)
                 .addField("Channel du ban : ", message.channel)
                 .setFooter("© SasunekiBot, 2018 | By Glazko")
                 message.member.guild.channels.find("name", "logs").send(embed)
                message.delete();
                });
        
                }
                
                if(message.content.startsWith(prefix +'kick')){
                    if (message.channel.type === "dm") return;
                    let kReason = args.join(" ").slice(22)
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
                      message.delete()
                    }
                             
                    kickMember.kick().then(member => {
                        const embed = new Discord.RichEmbed()
                         .setColor("#ffa500")
                        .addField("Un utilisateur a été kick !", "Un utilisateur a été kick " + member.user.tag)
                        .addField("Modérateurs ou Administrateur qui a kick : ", `${message.author}`)
                        .addField("Raison du kick :" , kReason)
                        .addField("Heure du kick : ", message.createdAt)
                        .addField("Channel du kick : ", message.channel)
                        .setFooter("© SasunekiBot, 2018 | By Glazko")
                         message.member.guild.channels.find("name", "logs").sendEmbed(embed)
                        message.delete();
                            });
                          } 

                          //if(message.content === prefix + "help"){
                              //message.channel.send(":warning: | La commande est en mis à jour !")
                              //message.delete()
    //Commandes support
    if(message.content === prefix + "help"){
        var help_embed = new Discord.RichEmbed()
        .setColor("#ffa500")
        .setThumbnail(message.author.avatarURL)
        .addField("🦊 SasunekiBot | Help","_ _")
        .addField("**:hammer_pick: Les commandes utilitaires du bot.**","_ _")
        .addField("**s!help**","Permet de visualiser la commande que vous voyez actuellement.")
        .addField("**s!serveurinfo**","Permet de savoir des info sur ce serveur.")
        .addField("**s!bug**","Permet de report tout bug pouvant arriver.")
        .addField("**s!invite**","Permet d'acceder au lien pour inviter le bot !")
        .addField("**s!FreeSchool**","Permet de voir le merveilleux discord de FreeSchool[FR]")
        .addField("_ _","_ _")
        .addField("**:beginner: Les commandes administrative du bot.**","_ _")
        .addField("**s!ban <@utilisateur> [raison]**","Permet de bannir un membre.")
        .addField("**s!kick <@utilisateur> [raison]**","Permet d'expulser un membre.")
        .addField("**s!clear**", "Permet de nettoyer un channel.")
        .addField("_ _","_ _")
        .addField("**:tada: Les commandes divers.**","_ _")
        .addField("**s!avatar**", "Permet de voir ta photo de profil de plus prêt.")
        .addField("**s!8ball**", "Permet de jouer avec le bot et de lui poser des questions.")
        .setFooter("© SasunekiBot, 2018 | By Glazko")
        message.channel.sendMessage(help_embed)
        message.delete()
        console.log("Un utilisateur a exécuté la commande : s!help et elle a fonctionnée.")
        
        
 }
    
            if(message.content === prefix + "invite"){
                var invite_embed = new Discord.RichEmbed()
                .setColor("#ffa500")
                .setTitle("🦊 SasunekiBot | Invite")
                .setThumbnail(message.author.avatarURL)
                .addField("**Voici le lien pour inviter Sasuneki sur ton serveur :**","_ _")
                .addField("**Clique sur le renard :smiley:**","_ _")
                .addField("Par ici :" , "-> **[🦊](https://discordapp.com/api/oauth2/authorize?client_id=444585695177342980&permissions=272104647&scope=bot)**")
                .addField("**Pour plus d'informations, contactez GlAzKo#0300** :smiley:","_ _")
                .setFooter("© SasunekiBot, 2018 | By Glazko")
                message.channel.sendMessage(invite_embed)
                message.delete()
                console.log("Un utilisateur a exécuté la commande : s!invite et elle a fonctionnée.");
}
                    //if(message.content === prefix + "support"){
                        //var support_embed = new Discord.RichEmbed()
                       // .setColor("#ffa500")
                        //.setTitle("🦊 SasunekiBot | Support")
                        //.setThumbnail(message.author.avatarURL)
                       // .setDescription("**Voici mon support : https://discord.gg/TeT3R5C.**")
                       // .setFooter("© SasunekiBot, 2018 | By Glazko")   
                       // message.channel.sendMessage(support_embed)
                       // message.delete()
                        //console.log("Un utilisateur a exécuté la commande : s!support et elle a fonctionnée.");
                    //}           

                    if(message.content === prefix + "FreeSchool"){

                        var user_embed = new Discord.RichEmbed()
                        .setColor("#ffa500")
                        .setTitle("🦊 SasunekiBot | Free School [FR] 2.1.0")
                        .setThumbnail(message.author.avatarURL)
                        .addField(":loudspeaker: Hello les amis, vous connaissez Free School Fr ? si vous ne connaissez pas, laisser moi vous expliquer ce que c'est :","_ _")
                        .addField("C'est un serveur ou vous apprendrez; les professeurs seront là pour ça, vous pourrez apprendre à créer un jeu vidéo, faire un logo, créer une histoire/un roman, créer un serveur discord...","_ _")
                        .addField("Vous apprendrez en fonction des profs présents et disponibles, tous expérimentés et motivés pour vous aider.  Des fonctionnalités peuvent être ajoutées à n'importe quel moment. Des bots sont présent pour la modération et l'occupation !","_ _")
                        .addField(":pushpin: En plus veuillez noter que vous aussi si vous souhaitez proposer un cours, vous pouvez en faire la demande au près du staff de Free School Fr !!","_ _")
                        .addField("Alors pourquoi tu rejoint pas le discord ?", "https://discord.gg/SxyUVjD")
                        .setFooter("© SasunekiBot, 2018 | By Glazko")
                        message.channel.sendEmbed(user_embed);
                        message.delete()
                        console.log("Un utilisateur a exécuté la commande : s!FreeSchool et elle a fonctionné.")
                        }

                    if(message.content === prefix + "serveurinfo"){
                         var info_embed = new Discord.RichEmbed()
                          .setColor("#ffa500")
                          .setTitle("🦊 SasunekiBot | Info Serveur")
                          .setThumbnail(message.author.avatarURL)
                          .addField("**Nom du Discord :**", "Le discord s'appelle : " + message.guild.name)
                          .addField("**Propriétaire du discord :**", "Le propriétaire c'est : " + message.guild.owner)
                          .addField("**Crée le :**", "Le serveur a été crée le : " + message.guild.createdAt)
                          .addField("**ID**", "L'ID du serveur c'est : " + message.guild.id)
                          .addField("**La région**", "La région du serveur est : " + message.guild.region)
                          .addField("**Tu as rejoint le :**", "Tu es venue le " + message.member.joinedAt)
                          .addField("**Nombres de membres sur le Discord :**", "On est actuellement : " + message.guild.memberCount)
                          .setFooter("© SasunekiBot, 2018 | By Glazko")
                          message.channel.sendEmbed(info_embed);
                          message.delete()
                         console.log("Un utilisateur a exécuté la commande : s!info et elle a fonctionné.")

                         
                    }
                

});
                    
client.login(token)