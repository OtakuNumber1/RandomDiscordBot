const Discord = require('discord.js');

const client = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES"] });
require('dotenv').config();
console.log(process.env.BOT_TOKEN);
var wokisaetze = require('../WokiBot/lines.js');
client.once('ready', () =>{

   console.log("Servus meine Prinzen!");
   const guildid = process.env.GUILD_ID;
   const guild = client.guilds.cache.get(guildid);
    let commands;

    if(guild){
        commands = guild.commands;
    }else{
        commands = client.application?.commands;
    }

    commands?.create({
        name: 'servas',
        description: 'Test Command vum WokiBot'
    })

    commands?.create({
        name: 'präsentier',
        description: 'POV: Du bist mid deina Präsi fertig'
    })
});

client.on('interactionCreate', (interaction) => {

    if (!interaction.isCommand()) {
      return
    }
    const { commandName, options } = interaction
    if (commandName === 'test') {
      
        interaction.reply({
        content: "WOKI BOT",
        ephemeral: false 
        
      })
    }

    if(commandName === 'servas'){
      
        
        var random = Math.floor(Math.random() * 11);
        var satz = wokisaetze[random];

        interaction.reply({
            ephemeral: false,
            content: satz 
        })
    }
    if(commandName === 'präsentier'){
        
        interaction.reply({
            ephemeral: false,
            content: "hmmmmmm" 
        })

        const channel = client.channels.cache.get(interaction.channelId)       
        setTimeout(() => { channel.send("hmhm hmhmhm hmmm hmmmmmm...");}, 3000);
        setTimeout(() => { channel.send("is nd bes gmant, oba des wor kacke!")}, 6000);
    }
  })


client.on('messageCreate', (message) =>{
    if(message.content === "." && message.channelId == 948874797767594034){
        console.log(message.channelId);
        let satz = "";
        const channelID = message.channelId;
        let skipped = false;
        let finished = false;
        var lastmessages = [];
        const channel = client.channels.cache.get(channelID);
        channel.messages.fetch({ limit: 100}).then(messages =>{
            messages.forEach(message => {

                if(message.content === "."){
                    if(skipped === true){
                        finished = true;
                    }
                    skipped = true;
                    
                }

                if(skipped === true && finished === false && message.content && message.author.bot === false){
                    lastmessages.push(message);
                }
                
                skipped = true; 
                
                })
            
            lastmessages.reverse();
            lastmessages.forEach(message => {
                if(message === "."){
                }else{
                    satz = satz.concat(" ");
                    satz = satz.concat(message);
                }
                })
        }).then(() => {message.reply(satz);
        });
    }

    if(message.content.includes("Schau moi da")){
        message.reply("Schiacha Hund")
    }
    if(message.content === "Ist hier jemand Arzt?"){
        for(i=0; i<5; i++){
            message.channel.send("MEI FRAU IST ÄRZTIN!!!")
        }
        message.channel.send("https://cdn.discordapp.com/attachments/626698387017826304/951416600001667132/unknown.png");
    }

});


client.login(process.env.BOT_TOKEN);