const BotMessageFilter = require('./BotMessageFilter');
const fs = require('fs');
const auth = require("./config/config")
const api = require("./ApiProvider");

api.client.login(auth.token)
    .catch(console.log)

api.client.on('message', (msg) => {
    BotMessageFilter.instance.filter(msg)
});