import {Filter} from "./Filter";
import {Message, TextChannel} from "eris";

const filterConf = require("../../ServerConfigs.json");

export class CommandFilter extends Filter{
    constructor() {
        super(true);
    }

    protected filterCheck(msg: Message): boolean {
        return true;
    }

    protected sendRespond(msg: Message) {
        if (msg.channel instanceof TextChannel) {
            msg.channel.createMessage(
                `Bot Commands belong in the <#${filterConf[msg.channel.guild.id].botChannelID}>`
            ).catch(console.log);
        }
    }
}