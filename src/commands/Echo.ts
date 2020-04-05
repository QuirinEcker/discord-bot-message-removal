import {Command} from "./Command";
import {Message} from "eris";

export class Echo implements Command{

    public async execute(msg: Message, args: Array<any>) {
        await msg.channel.createMessage(args.join(" "));
    }

}