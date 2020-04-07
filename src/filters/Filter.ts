import {Message} from "eris";

export abstract class Filter {
    private readonly responseEnabled;
    private readonly responseDeletion;
    private readonly responseDeletionTime;
    private static responses = new Array<Promise<string>>();

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

    public execute(msg: Message) {
        if (this.filterCheck(msg)) {
            if (!this.responsesIncludeMessage(msg.id)) {
                msg.delete()
                    .catch(console.log);
            }
            if (this.responseEnabled === true) {
                Filter.responses.push(this.sendResponse(msg));
            }
        }
    }

    protected toResponse(msg: Message): string {
        return "Message got filtered";
    }

    private sendResponse(msg: Message): Promise<string> {
        return msg.channel.createMessage(this.toResponse(msg))
            .then(message => {
                if (this.responseDeletion === true) {
                    setTimeout(() => {
                        message.delete()
                            .catch(console.log)
                    }, this.responseDeletionTime)
                }

                return message.id;
            })
    }

    private responsesIncludeMessage(id: string): boolean {
        const filterResult: Array<Promise<string>> = Filter.responses.filter(async promise => {
            const messageId: string = await promise;
            return id === messageId;
        });

        return filterResult.length > 0;
    }
}