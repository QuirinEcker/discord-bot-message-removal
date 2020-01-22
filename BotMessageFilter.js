class BotMessageFilter {

    constructor(config) {
        this.config = config;
    }

    filer(msg) {

    }

    static get instance() {
        return BotMessageFilter.instance;
    }
}

BotMessageFilter.instance = new BotMessageFilter(require('./config/filterConf'));

module.exports = BotMessageFilter;