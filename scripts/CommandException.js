class CommandException extends Error{

    constructor(message) {
        super();
        this.message = message;
        this.name = "CommandException";
    }
}

module.exports = CommandException;