const BotMessageFilter = require('./BotMessageFilter');
const fs = require('fs');
const auth = require("../config/config")
const api = require("./ApiProvider");
const DiscordCommand = require("./Command")

api.client.login(auth.token)
    .catch(console.log)

api.client.on("ready", () => {
    let command = new DiscordCommand("alpmf")
});

api.client.on('message', (msg) => {
    BotMessageFilter.instance.filter(msg)
});