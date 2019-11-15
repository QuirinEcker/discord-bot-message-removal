const Discord = require('discord.js');
const Config = require('./config');
const client = new Discord.Client();


client.login(Config.token)
.catch(() => {
    console.log('login failed');
});

function isCommandPrefix(prefix) {
    for (let index in Config.bots) {
        if (Config.bots[index].prefix == prefix) {
            return true;
        }
    }
}

function messageIsFromBot(id) {
    let bool = false;

    Config.bots.forEach((bot) => {
        bool = bot.id === id;
    });

    return bool;
}

function messageIsCommand(prefix) {
    let bool = false;

    Config.bots.forEach((bot) => {
        bool = bot.prefix === prefix;
    });

    return bool;
}

client.on('message', (msg) => {
    let prefix = msg.content.charAt(0);


    if (msg.channel.id !== Config.botChannelID) {
        if (messageIsFromBot(msg.author.id)) {
            msg.delete()
                .catch(message => console.log(message));
        } else if (messageIsCommand(prefix)) {
            msg.channel.send("commands in bot channel")
                .then((message) => {
                    msg.delete()
                        .catch(message => console.log(message));

                    setTimeout(() => {
                        message.delete()
                            .catch(message => console.log(message));
                    }, 5000)
                })
                .catch(message => console.log(message));
        }
    }
});