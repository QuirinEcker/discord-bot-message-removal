export abstract class Filter {

    protected abstract check(msg): boolean;

    public filter(msg) {
        if (this.check(msg)) {
            msg.delete();
        }
    }
}