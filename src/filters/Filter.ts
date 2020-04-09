import {Message} from "eris";

export abstract class Filter {
    private readonly responseEnabled;
    private readonly responseDeletion;
    private readonly responseDeletionTime;
    private static messageWhiteList = new Array<Promise<Message>>();

    protected constructor(
        responseEnabled: boolean = true,
        responseDeletion: boolean = true,
        responseDeletionTime: number = 5000
    ) {
        this.responseEnabled = responseEnabled;
        this.responseDeletion = responseDeletion;
        this.responseDeletionTime = responseDeletionTime;
    }

    protected abstract filterCheck(msg: Message): boolean;

    public async execute(msg: Message) {
        if (this.filterCheck(msg)) {
            if (! await Filter.responsesIncludeMessageID(msg.id)) {
                msg.delete()
                    .catch(console.log);
            } else {
                Filter.deletePromiseWithSameMessageID(msg.id)
                    .catch(console.log)
            }
            if (this.responseEnabled === true) {
                Filter.messageWhiteList.push(this.sendResponse(msg));
            }
        }
    }

    protected toResponse(msg: Message): string {
        return "Message got filtered";
    }

    private sendResponse(msg: Message): Promise<Message> {
        return msg.channel.createMessage(this.toResponse(msg))
            .then(message => {
                if (this.responseDeletion === true) {
                    setTimeout(() => {
                        message.delete()
                            .then(console.log);
                    }, this.responseDeletionTime)
                }

                return message;
            });
    }

    private static async responsesIncludeMessageID(id: string): Promise<boolean> {
        //console.log(this.messageWhiteList.length);
        for (const messagePromise of Filter.messageWhiteList) {
            const message: Message = await messagePromise;
            if (message.id === id) return true;
        }

        return false;
    }

    private static async deletePromiseWithSameMessageID(id: string): Promise<void> {
        let i = 0;
        for (const messagePromise of Filter.messageWhiteList) {
            const message: Message = await messagePromise;
            if (message.id === id){
                Filter.messageWhiteList.splice(i, 1);
                console.log("message deleted with id " + i);
            }
            i++;
        }
    }
}