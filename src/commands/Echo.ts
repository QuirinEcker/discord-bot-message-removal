import {Command} from "./Command";
import {Message} from "eris";

export class Echo extends Command{
    constructor() {
        super("echo", 1, Number.MAX_VALUE);
    }

    protected async run(msg: Message, args: Array<any>) {
        await msg.channel.createMessage(args.join(" "));
    }

}