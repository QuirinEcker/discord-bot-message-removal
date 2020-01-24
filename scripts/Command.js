class Command {
    constructor(msg, stringCommand) {
        if (typeof stringCommand === "string") {
            if (stringCommand.charAt(0) === "§") {
                stringCommand = stringCommand.slice(1,stringCommand.length);
                this.baseCommand = stringCommand.split(" ")[0];
                this.parameter = stringCommand.split(" ").splice(1, stringCommand.split(" ").length);
                this.valid = false;
                this.commandFunc = null;
                this.msg = msg;
            } else throw Error();
        } else {
            throw Error("constructor only accepts String");
        }
    }

    isValid() {
        return this.valid;
    }

    run() {
        if (this.valid === true) {
            this.commandFunc(this.msg, this.parameter);
        } else {
            throw "command is not valid"
        }
    }
}

module.exports = Command;