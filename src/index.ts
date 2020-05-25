import {ImploBot} from "./ImploBot";

console.log("refreshing")
const imploBot = new ImploBot();
imploBot.run()
    .catch(console.log);
