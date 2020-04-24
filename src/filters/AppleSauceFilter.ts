import {Filter} from "./Filter";
import {Message} from "eris";

export class AppleSauceFilter extends Filter {
    protected filterCheck(msg: Message): boolean {
        return msg.author.id === "351738461847289856";
    }

    protected toResponse(msg: Message): string {
        return "I don't want no applesauce";
    }
}