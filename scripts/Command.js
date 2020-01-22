class Command {
    constructor(stringCommand) {
        if (typeof stringCommand === "string") {
            if (stringCommand.charAt(0) === "§") {
                stringCommand = stringCommand.slice(1,stringCommand.length);
                this.baseCommand = stringCommand.split(" ")[0];
                this.parameter = stringCommand.split(" ").splice(1, stringCommand.split(" ").length);
                this.valid = false;
            } else {
                throw "missing prefix"
            }
        } else {
            throw "constructor only accepts String"
        }
    }

    isValid() {
        return this.valid;
    }

    run(msg) {
        msg.send("command is not valid");
    }
}

module.exports = Command;