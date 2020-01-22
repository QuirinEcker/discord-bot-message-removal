class ApiProvider {

    constructor(props) {
        this._Discord = require("discord.js");
        this._client = new this._Discord.Client();
    }


    get Discord() {
        return this._Discord;
    }

    get client() {
        return this._client;
    }
}

ApiProvider.instance = new ApiProvider();
module.exports = ApiProvider.instance;