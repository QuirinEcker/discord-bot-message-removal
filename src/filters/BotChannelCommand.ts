import {Filter} from "./Filter";
import {Message} from "eris";

const filterConf = require("../../config/filterConf.json");

export class BotChannelCommand extends Filter{
    constructor() {
        super(`Bot Commands belong in the bot channel ${filterConf.botChannelID}`);
    }

    protected check(msg: Message): boolean {
        return msg.channel.id === filterConf.botChannelID;
    }
}