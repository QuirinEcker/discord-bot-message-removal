export abstract class Filter {

    protected abstract check(msg): boolean;

    public async filter(msg): Promise<void> {
        if (this.check(msg)) {
            await msg.delete();
        }
    }
}