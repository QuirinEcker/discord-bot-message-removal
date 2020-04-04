const filterconf = require("../config/filterConf");
const CommandException = require("./CommandException");

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
        if (this.valid === true && this.permissionToRun()) {
            this.commandFunc(this.msg, this.parameter);
        } else {
            throw new CommandException("command is not valid or in the wrong channel");
        }
    }

    permissionToRun() {
        return this.msg.channel.id === filterconf.botChannelID;
    }
}

module.exports = Command;