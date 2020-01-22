const BotMessageFilter = require('./BotMessageFilter');
const fs = require('fs');
const Discord = require('discord.js');
const client = new Discord.Client();
const auth = require("./config/config")

client.login(auth.token)
    .catch(console.log)

client.on('message', (msg) => {
    BotMessageFilter.instance.filter(msg)
});