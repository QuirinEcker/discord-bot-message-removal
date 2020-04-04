class BotMessageFilter {

    constructor(config) {
        this.config = config;
    }

    filter(msg) {
        if (this.config.hasOwnProperty("botChannelID")) {
            if (msg.channel.id !== this.config.botChannelID) {
                this.filterDelete(msg);
            }
        } else {
            console.error("botChannelID was not defined in the filterConfig.json file");
        }
    }

    filterDelete(msg) {
        let prefix = msg.content.charAt(0);
        if (this.messageIsFromBot(msg.author.id)) {
            msg.delete()
                .catch(console.log)
        } else if (this.messageIsCommand(prefix)) {
            msg.channel.send('please send Commands into the Botchannel')
                .then(message => {
                    msg.delete()
                        .catch(console.log);

                    setTimeout(() => {
                        message.delete()
                            .catch(console.log)
                    }, 5000);
                }).catch(console.log)
        }
    }

    messageIsCommand(prefix) {
        let matchingPrefixCount = 0;

        if (this.config.hasOwnProperty("bots")) {
            this.config.bots.forEach((bot) => {
                if (bot.prefix === prefix) {
                    matchingPrefixCount++;
                }
            });
        } else  {
            console.error("bot wasn't defined in filterConfig.json file");
        }

        return matchingPrefixCount > 0;
    }

    messageIsFromBot(id) {
        let matchingBotCount = 0;

        if (this.config.hasOwnProperty("bots")) {
            this.config.bots.forEach((bot) => {
                if (bot.id === id) {
                    matchingBotCount++;
                }
            });
        } else  {
            console.error("bot wasn't defined in filterConfig.json file");
        }

        return matchingBotCount > 0;
    }
}

BotMessageFilter.instance = new BotMessageFilter(require('../config/filterConf'));

module.exports = BotMessageFilter;