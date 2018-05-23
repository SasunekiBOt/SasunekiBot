const Discord = require('discord.js');
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')

const adapter = new FileSync('database.json')
const db = low(adapter);

db.defaults({ DataBase:  []})
.write()

const client = new Discord.Client();

var prefix = "s!";
var token =(process.env.TOKEN);

client.on("ready", async () => {
    console.log("Bot prêt a utilisé !");
    client.user.setActivity(" s!help || " + client.guilds.size + " guilds || " + client.users.size + " users");

});

//Bienvenue aurevoir
//client.on('guildMemberAdd', function (member) {
 //   member.createDM().then(function (channel) {
      //  return channel.send('**Bienvenue sur le serveur ! Amuse toi bien et au plaisir de te voir ! :smiley:**');
  //  }).catch(console.error)
//})

client.on('guildMemberRemove', function (member) {
    member.createDM().then(function (channel) {
        return channel.send('**Au revoir, une bonne continuation à toi, bonne journée :wink:**');
    }).catch(console.error)
})

client.on('message', message => {


        if(message.content.startsWith(prefix + 'setConfig')) {
      message.guild.createRole({
          name: 'Muted', 
          color: '#0a0a0a',
          ADD_REACTIONS: false, 
          SEND_MESSAGES: false})
          message.delete()
    }
    
    if(message.content.startsWith(prefix + 'setConfig')) {   
    message.guild.createChannel('logs', 'logs');   
    message.channel.sendMessage(":warning: | La configuration du bot à bien été effectuer !")
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
            
            if(message.content === 'listbot') {
                message.channel.send("Il y a " + client.users.size + "membres connectés || " + client.guilds.size + "guilds !")
                message.delete()
    
                }

        if(!message.content.startsWith(prefix)) return;
        var args = message.content.substring(prefix.length).split(" ");

        switch (args[0].toLowerCase()) {

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
            .addField("_ _","_ _")
            .addField("La question est celle ci :", tte)
            .addField("_ _","_ _")
            .addField("Voici ma réponse :",reponse)
            .setFooter("© SasunekiBot, 2018 | By GlAzKo#0300")
            message.channel.sendEmbed(embed)
            message.delete()
        }

        //Ban et kick
        if(message.content.startsWith(prefix +'ban')){
            if (message.channel.type === "dm") return;
            let bReason = args.join(" ").slice(22);
            if(!message.guild.member(message.author).hasPermission("BAN_MEMBERS"))  return message.reply(":warning: | Vous n'avez pas la permission !").catch(console.error);
            if(message.mentions.users.size === 0) {
              return message.channel.send(":warning: | Vous devez mentionner un membre a ban pour que cette commande fonctionne !");
            }
            let banMember = message.guild.member(message.mentions.users.first());
            if(!banMember) {
              return message.channel.send(":warning: | Je ne suis pas sur que cet utilisateur existe...");
            }
            if(!message.guild.member(client.user).hasPermission("BAN_MEMBERS")) {
              return message.reply(":warning: | Je n'ai pas la permission pour bannir.").catch(console.error);
            }
                     
            banMember.ban().then(member => {
                const embed = new Discord.RichEmbed()
                 .setColor("#ffa500")
                 .addField("Un utilisateur a été ban !", "L'utilisateur banni " + member.user.tag)
                 .addField("_ _","_ _")
                 .addField("Modérateurs ou Administrateur qui a ban : ", `${message.author}`)
                 .addField("_ _","_ _")
                 .addField("Raison du ban :",bReason)
                 .addField("_ _","_ _")
                 .addField("Heure du ban : ", message.createdAt)
                 .addField("_ _","_ _")
                 .addField("Channel du ban : ", message.channel)
                 .setFooter("© SasunekiBot, 2018 | By Glazko")
                 message.member.guild.channels.find("name", "logs").send(embed)
                message.delete();
                });
        
                }
                
                if(message.content.startsWith(prefix +'kick')){
                    if (message.channel.type === "dm") return;
                    let kReason = args.join(" ").slice(22)
                    if(!message.guild.member(message.author).hasPermission("KICK_MEMBERS"))  return message.reply(":warning: | Vous n'avez pas la permission !").catch(console.error);
                    if(message.mentions.users.size === 0) {
                      return message.channel.send(":warning: | Vous devez mentionner un membre a ban pour que cette commande fonctionne !");
                    }
                    let kickMember = message.guild.member(message.mentions.users.first());
                    if(!kickMember) {
                      return message.channel.send(":warning: | Je ne suis pas sur que cet utilisateur existe...");
                    }
                    if(!message.guild.member(client.user).hasPermission("KICK_MEMBERS")) {
                      return message.reply(":warning: | Je n'ai pas la permission pour bannir.").catch(console.error);
                      message.delete()
                    }
                             
                    kickMember.kick().then(member => {
                        const embed = new Discord.RichEmbed()
                         .setColor("#ffa500")
                        .addField("Un utilisateur a été kick !", "L'utilisateur kick " + member.user.tag)
                        .addField("_ _","_ _")
                        .addField("Modérateurs ou Administrateur qui a kick : ", `${message.author}`)
                        .addField("_ _","_ _")
                        .addField("Raison du kick :" , kReason)
                        .addField("_ _","_ _")
                        .addField("Heure du kick : ", message.createdAt)
                        .addField("_ _","_ _")
                        .addField("Channel du kick : ", message.channel)
                        .setFooter("© SasunekiBot, 2018 | By GlAzKo#0300")
                         message.member.guild.channels.find("name", "logs").sendEmbed(embed)
                        message.delete();
                            });
                          } 
                          
                          function mute(message,prefix,client){
	
                            if(message.content.startsWith(prefix + "mute"))
                        if(message.member.hasPermission("BAN_MEMBERS")) {
                    
                            if(message.mentions.members.size > 0) {
                    
                    
                                const muteRole = message.guild.roles.find("name", "Muted");
                    
                                if(message.mentions.members.first().roles.has(muteRole)) {
                    
                                    message.reply(":warning: | L'utilisateur mentionner à déjà été mute !");
                    
                                    message.delete();
                    
                                } else if(message.mentions.members.first().toString() == message.member.toString()) {
                    
                                    
                    
                                    message.channel.sendMessage(message.member.toString() + ":warning | Vous ne pouvez pas vous mute !");
                    
                                    message.delete();
                    
                                    
                    
                                } else {
                    
                                    message.mentions.members.first().addRole(muteRole);
                    
                                    message.channel.sendMessage(message.mentions.members.first().toString() + " à bien été mute !");
                    
                                    message.delete();
                    
                                }
                    
                    
                            } else {
                    
                                message.reply(":warning: | Veuillez mentionner un utilisateur valide !");
                    
                                message.delete();
                    
                            }
                    
                           } else {
                    
                            message.reply(":warning: | Vous n'avez pas la permission d'effectuer cette commande !");
                    
                            message.delete();
                    
                            module.exports = mute
                           }
                    
                        }
                    
                    

                          //if(message.content === prefix + "help"){
                              //message.channel.send(":warning: | La commande est en mis à jour !")
                              //message.delete()
    //Commandes support
    if(message.content === prefix + "help"){
        var help_embed = new Discord.RichEmbed()
        .setColor("#ffa500")
        .setThumbnail(message.author.avatarURL)
        .setTitle("🦊 SasunekiBot | Help")
        .addField("_ _","_ _")
        .addField("**<:Discordlogo:440140970152165378> | Utilitaires**","_ _")
        .addField("**s!serveurinfo**","Permet de savoir des info sur ce serveur.")
        .addField("**s!bug**","Permet de report tout bug pouvant arriver.")
	.addField("**s!invite**","Permet d'inviter le bot sur ton serveur.")
        .addField("**s!partenaires**","Permet de voir les merveilleux discord avec qui je suis partenaires !")
        .addField("_ _","_ _")
        .addField("**<:maintenance:440140953525944330> | Modérations**","_ _")
	.addField("**s!setConfig**","Permet d'installer comme il faut le bot.")
	.addField("**s!ban <@utilisateur> [Raison]**","Permet de ban un utilisateur.")
	.addField("**s!kick <@utilisateur> [Raison]**","Permet de kick un utilisateur.")
	.addField("**s!un/mute <@utilisateur>**","Permet de unmute ou mute un utilisateur.")
        .addField("_ _","_ _")
        .addField("**:space_invader: | Fun**","_ _")
	.addField("**s!8ball [Texte]**","Permet de jouer et de poser des questions au bot")
	.addField("**s!sondage [Texte]**","Permet de faire un sondage grâce au bot.")
	.addField("**s!avatar**","Permet de voir ta photo de profil de plus près.")
        message.channel.sendMessage(help_embed)
        message.delete()
        console.log("Un utilisateur a exécuté la commande : s!help et elle a fonctionnée.")
        
    }

    if(message.content === prefix + "help"){
        var help_embed = new Discord.RichEmbed()
        .setColor("#ffa500")
        .addField("**<:emojidiscordlogobot:448182147086417921> | Invite**","**[SasunekiBot || Support](https://discord.gg/hMbyJg3)**")
        .setFooter("© SasunekiBot, 2018 | By GlAzKo#0300")
        message.channel.sendMessage(help_embed)
        message.delete()
        console.log("Un utilisateur a exécuté la commande : s!help et elle a fonctionnée.")
    }

          if(message.content === prefix + "Sasuneki") {
            var bot_embed = new Discord.RichEmbed()
            .setColor("#ffa500")
            .setThumbnail(message.author.avatarURL)
            .setTitle("🦊 SasunekiBot | Info Bot")
            .addField("_ _","_ _")
            .addField("**Mon créateur**", "J'ai été creer par GlAzKo#0300 !")
            .addField("_ _","_ _")
            .addField("**Jour de création**", "J'ai été creer le 12/05/18")
            .addField("_ _","_ _")
            .addField("**Voici mon préfix**", "Mon prefix est `" + prefix + "` !")
            .setFooter("© SasunekiBot, 2018 | By GlAzKo#0300")
            message.channel.sendEmbed(embed)
            message.delete()
        
 }
    
            if(message.content === prefix + "invite"){
                var invite_embed = new Discord.RichEmbed()
                .setColor("#ffa500")
                .setTitle("🦊 SasunekiBot | Invite")
                .setThumbnail(message.author.avatarURL)
                .addField("_ _","_ _")
                .addField("**Voici le lien de SasunekiBot et du nouveau support !**","_ _")
                .addField("_ _","**[SasunekiBot](https://discordapp.com/api/oauth2/authorize?client_id=444585695177342980&permissions=272104647&scope=bot)**")
                .addField("_ _","**[SasunekiBot || Support](https://discord.gg/hMbyJg3)**")
                .setFooter("© SasunekiBot, 2018 | By GlAzKo#0300")
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

                    if(message.content === prefix + "partenaires"){
                        var partenaires_embed = new Discord.RichEmbed()
                        .setColor("#ffa500")
                        .setTitle("🦊 SasunekiBot | Partenaires")
                        .setThumbnail(message.author.avatarURL)
                        .addField("_ _","_ _")
                        .addField("FreeSchool[FR] 2.1.0","Faites : s!FreeSchool")
                        .addField("_ _","_ _")
                        .addField("Support - YukiBot","Faites : s!YukiBot")
                        .addField("_ _","_ _")
                        .addField("EdeN Company","Faites : s!EdenCompany")
                        .setFooter("© SasunekiBot, 2018 | By GlAzKo#0300")
                        message.channel.sendEmbed(partenaires_embed);
                        message.delete()
                        console.log("Un utilisateur a exécuté la commande : s!partenaires et elle a fonctionné.")
                        }
                    if(message.content === prefix + "FreeSchool"){

                        var FreeSchool_embed = new Discord.RichEmbed()
                        .setColor("#ffa500")
                        .setTitle("🦊 SasunekiBot | Free School [FR] 2.1.0")
                        .addField("_ _","_ _")
                        .setThumbnail(message.author.avatarURL)
                        .addField(":loudspeaker: Hello les amis, vous connaissez Free School Fr ? si vous ne connaissez pas, laisser moi vous expliquer ce que c'est :","_ _")
                        .addField("C'est un serveur ou vous apprendrez; les professeurs seront là pour ça, vous pourrez apprendre à créer un jeu vidéo, faire un logo, créer une histoire/un roman, créer un serveur discord...","_ _")
                        .addField("Vous apprendrez en fonction des profs présents et disponibles, tous expérimentés et motivés pour vous aider.  Des fonctionnalités peuvent être ajoutées à n'importe quel moment. Des bots sont présent pour la modération et l'occupation !","_ _")
                        .addField(":pushpin: En plus veuillez noter que vous aussi si vous souhaitez proposer un cours, vous pouvez en faire la demande au près du staff de Free School Fr !!","_ _")
                        .addField("Alors pourquoi tu rejoint pas le discord ?", "https://discord.gg/SxyUVjD")
                        .setFooter("© SasunekiBot, 2018 | By GlAzKo#0300")
                        message.channel.sendEmbed(FreeSchool_embed);
                        message.delete()
                        console.log("Un utilisateur a exécuté la commande : s!FreeSchool et elle a fonctionné.")
                        }

                    if(message.content === prefix + "YukiBot"){
                        var YukiBot_embed = new Discord.RichEmbed()
                        .setColor("#ffa500")
                        .setTitle("🦊 SasunekiBot | YukiBot")
                        .addField("_ _","_ _")
                        .setThumbnail(message.author.avatarURL)
                        .addField("Yuki, est un bot de type Modération | Fun.","Vous allez me dire pourquoi Fun ?")
                        .addField("Car il a son propre mode de jeu (Nation)","Qui je pense peux avoir du charme.")
                        .addField("Mais attendez, il a aussi un vcs -> #vcs-yuki","Prefix: n! & custom")
                        .addField("Menu d'aide: n!help || n!hhelp","Bref venez nous rejoindre !")
                        .addField("_ _","_ _")
                        .addField("Voici les liens !","**[Support de Yuki](https://discord.gg/y4HFHUu)**")
                        .addField("_ _","**[Invite YukiBot](https://discordapp.com/api/oauth2/authorize?client_id=402497607282327553&permissions=-1&scope=bot)**")
                        .setFooter("© SasunekiBot, 2018 | By GlAzKo#0300")
                        message.channel.sendEmbed(YukiBot_embed);
                        message.delete()
                        console.log("Un utilisateur a exécuté la commande : s!YukiBot et elle a fonctionné.")
                        }
                  

                        if(message.content === prefix + "EdenCompany"){
                            var EdenCompany_embed = new Discord.RichEmbed()
                            .setColor("#ffa500")
                            .setThumbnail(message.author.avatarURL)
                            .setTitle("🦊 SasunekiBot | EdenCompany")
                            .addField("_ _","_ _")
                            .addField("EdeN Bot est un bot de type Multi","*De type Multi ?*")
                            .addField("_ _","_ _")
                            .addField("C'est-à-dire qu'il possède Musique, NSFW, Niveaux, Protection et bien plus encore.","*Protection ?*")
                            .addField("_ _","_ _")
                            .addField("En effet, le bot peut diagnostiquer ton serveur pour t'indiquer les failles de celui-ci.","*Il ban automatiquement ?!*")
                            .addField("_ _","_ _")
                            .addField("Il ne fait rien sans ta permission.","*Trop Bien !*")
                            .addField("_ _","_ _")
                            .addField("Voici les liens !","**[Support de EdenBot](https://discord.gg/RgF6Er4)**")
                            .addField("_ _","**[Invite EdenBot](https://discordapp.com/oauth2/authorize?client_id=418517710222393368&scope=bot&permissions=201718999)**")
                        .setFooter("© SasunekiBot, 2018 | By GlAzKo#0300")
                        message.channel.sendEmbed(EdenCompany_embed);
                        message.delete()
                        console.log("Un utilisateur a exécuté la commande : s!EdenCompany et elle a fonctionné.")
                    }
                    
	
	                  if (message.content.split(" ")[0] == prefix + "say")
  {
      message.delete().catch(function() {return 0});
      return message.channel.send(message.content.split(" ").splice(1).join(" ")).catch(function() {return 0});
  }
});

                        if(message.content === prefix + "serveurinfo"){
                         var info_embed = new Discord.RichEmbed()
                          .setColor("#ffa500")
                          .setTitle("🦊 SasunekiBot | Info Serveur")
                          .addField("_ _","_ _")
                          .setThumbnail(message.author.avatarURL)
                          .addField("**Nom du Discord :**", "Le discord s'appelle : " + message.guild.name)
                          .addField("**Propriétaire du discord :**", "Le propriétaire c'est : " + message.guild.owner)
                          .addField("**Crée le :**", "Le serveur a été crée le : " + message.guild.createdAt)
                          .addField("**ID**", "L'ID du serveur c'est : " + message.guild.id)
                          .addField("**La région**", "La région du serveur est : " + message.guild.region)
                          .addField("**Tu as rejoint le :**", "Tu es venue le " + message.member.joinedAt)
                          .addField("**Nombres de membres sur le Discord :**", "On est actuellement : " + message.guild.memberCount)
                          .setFooter("© SasunekiBot, 2018 | By GlAzKo#0300")
                          message.channel.sendEmbed(info_embed);
                          message.delete()
                         console.log("Un utilisateur a exécuté la commande : s!info et elle a fonctionné.")
 }
                        if (message.content.startsWith(prefix + "sondage")) {
                            
                            let args = message.content.split(" ").slice(1);
                            let thingToEcho = args.join(" ")
                            var sondage_embed = new Discord.RichEmbed()
                            .setTitle("🦊 SasunekiBot | Sondage")
                            .setColor("#ffa500")
                            .setThumbnail(message.author.avatarURL)
                            .addField("_ _","_ _")
                            .addField(message.author.username + " a fait un sondage, veuillez voter !","_ _")
                            .addField("- " + thingToEcho,"_ _")
                            .setFooter("© SasunekiBot, 2018 | By GlAzKo#0300")
                            .setTimestamp()
                            message.delete()
                            message.channel.sendEmbed(sondage_embed)
                            .then(function (message) {
                                message.react("✅")
                                message.react("❌")
                        });
                    }
                

                  //   client.on('message', (msg) => {

                      //   if(msg.channel.name == "verification"){
                      
                      //   if(msg.author !== client.user) {
                      
                       //    msg.delete();
                      
                     //    }else{
                      
                       //    msg.channel.send();
                      
                     //    }
                   //    }
                      
                  //     });
                      
                      
                   //    client.on('message', (msg) => {
                      
                    //   if(msg.author.id != client.id){
                      
                    //   if(msg.channel.name == "verification" && msg.content.startsWith(prefix)){
                      
                          //     var say = msg.content.substr(1);
                      
                           //    for(i=0;i<Attente.length;i++){
                      
                             //      var code = Attente[i].indexOf("x");
                      
                             //  }
                      
                            //   code++;
                      
                        //       for(i=0;i<Attente.length;i++){
                      
                  //     var recode = Attente[i].substr(code);
                      
                  //     }
                            //   if(say == recode){
                      
                         //          Attente.pop();     
                      
                      // let NouveauMembre = msg.guild.roles.find("name", "Membres");
                      
                      // if(!msg.guild.roles.exists("name", "Membres")) {
                      
                          //     return  msg.channel.send("**:warning: | Le role `Membres` n'existe pas, veuillez le créer pour faire fonctionner le captcha !**")
                           
                       //      } 
                     //  msg.member.addRole(NouveauMembre).catch(err => console.log(err));   
                      
                              // }else{
                      
                                 //  msg.author.send("**:warning: | Vous avez pas réussi à passer le captcha...**");
                      
                              //     msg.delete();
                      
                           //        if(!msg.guild.member(client.user).hasPermission("KICK_MEMBERS")) {
                      
                        // return;
                      // }
                      
                     //  msg.guild.member(msg.author).kick();
                      
                          //     }
                       //  }
                     //  }
                      
                     //  });
                      
                      // client.on('guildMemberAdd', member => {  
                      
                     //  const salon = member.guild.channels.find('name', '');
                      
                        //   if(!salon) return;
                      
                     //  var captcha = String(Math.random()).charAt(4) + String(Math.random()).charAt(4) + String(Math.random()).charAt(4) + String(Math.random()).charAt(4) + String(Math.random()).charAt(4);
                                 
                      //             member.send("Bienvenue @"+ member.user.username + " copie/colle le code ci-join dans **#verification** pour passer le captcha du serveur\n```s!" + captcha + "```");
                              
                   //                member.user.id;
                               
                //                   Attente.push(member.user.id + "x" + captcha);
                       
              //            salon.send("**Bienvenue @"+ member.user.username + "**"); 
                      
                      // });

                      
});
                    
client.login(token)
