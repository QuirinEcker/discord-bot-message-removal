import { Message } from "eris";

export interface Command {
    execute(msg: Message, args: Array<any>) : void;
}