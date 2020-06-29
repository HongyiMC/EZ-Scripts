import {
    onChat
} from "ez:chat";

const system = server.registerSystem(0, 0);
console.log("chatCMD.js loaded");

let suicide = ['.suicide'];

onChat((cmdObject) => {
    try {
        if (cmdObject.content === suicide[0]) {
			system.executeCommand(`kill "${cmdObject.sender}"`, () => {});
        }
    } catch(err) {
        console.error(err);
    }
});