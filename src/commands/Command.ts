import { Message } from "eris";

export abstract class Command {
    protected minArguments: number;
    protected maxArguments: number;
    name: string;

    protected constructor(
        name: string,
        minimumNumberOfArguments: number,
        maximumNumberOfArguments: number
    ) {
        this.name = name;
        this.minArguments = minimumNumberOfArguments;
        this.maxArguments = maximumNumberOfArguments;
    }

    public execute(msg: Message, args: Array<any>): void {
        if (this.argumentsAreValid(args)) {
            this.run(msg, args);
        } else {
            // fehler
        }
    }

    protected argumentsAreValid(args: Array<any>) {
        return this.minArguments <= args.length && args.length <= this.maxArguments;
    }

    protected abstract run(msg: Message, args: Array<any>) : void;
}