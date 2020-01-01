const fs = require('fs');
const Member = require('./Member');
const Discord = require('discord.js');
const Config = require('./config/config.json');
const client = new Discord.Client();

client.login(Config.token)
.catch(exception => {
    console.log(exception.message);
});

function getMembersFromString(data) {
    let dataArray = data.split('\n');
    let memberArray = [];

    dataArray.forEach((line) => {
        let lineFragment = line.split(';');
        console.log(lineFragment[1].split(':')[0]);
        console.log(lineFragment[1].split(':')[1]);
        console.log(lineFragment[0].split(':')[0]);
        console.log(lineFragment[0].split(':')[1]);
        console.log(lineFragment[2]);
        memberArray.push(new Member(
            lineFragment[1].split(':')[0],
            lineFragment[1].split(':')[1],
            lineFragment[0].split(':')[0],
            lineFragment[0].split(':')[1],
            lineFragment[2]
        ));
    });
    console.log(memberArray);

    return memberArray;
}

function getMemberFromID(arr, id) {
    return arr.filter(arrElement => arrElement.id === id)[0];
}

function isCommandPrefix(prefix) {
    for (let index in Config.bots) {
        if (Config.bots[index].prefix == prefix) {
            return true;
        }
    }
}

function messageIsFromBot(id) {
    let matchingBotCount = 0;

    Config.bots.forEach((bot) => {
        if (bot.id === id) {
            matchingBotCount++;
        }
    });

    return matchingBotCount > 0;
}

function messageIsCommand(prefix) {
    let matchingPrefixCount = 0;

    Config.bots.forEach((bot) => {
        if (bot.prefix === prefix) {
            matchingPrefixCount++;
        }
    });

    return matchingPrefixCount > 0;
}

function getID(memberIDString) {
    let outputString = memberIDString.substring(2, memberIDString.length
    -1);
    return outputString;
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