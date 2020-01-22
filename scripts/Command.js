class Command {
    constructor(stringCommand) {
        if (stringCommand instanceof String) {
            if (stringCommand.charAt(0) === "§") {
                stringCommand = stringCommand.cut(0);
                console.log(stringCommand)
            } else {
                throw Error("missing prefix")
            }
        } else {
            throw Error("constructor only accepts String")
        }
    }
}

module.exports = Command;