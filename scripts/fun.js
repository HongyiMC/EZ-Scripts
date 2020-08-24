import {
    onChat
} from "ez:chat";

const system = server.registerSystem(0, 0);

const foo = {
    "marco" : "polo",
    "lol" : "Whats so funny",
    "hongyi is handsome" : "He is super handsome",
    "hongyi is ugly" : "Your mom is ugly",
    "who is candice" : "Candice d**k fit in your mouth?",
    "how to play" : "Use a boat to leave spawn and enjoy vanilla survival",
    "how do i play" : "Use a boat to leave spawn and enjoy vanilla survival",
    "hi" : "hello!"
};

onChat( ({ content }) => {
    if (content.toLowerCase() in foo) {
        const rawText = {
            rawtext : [{
                text : "<§eInto§6CMD§r> " + foo[content.toLowerCase()]
            }]
        };
        system.executeCommand(`tellraw @a ${JSON.stringify(rawText)}`, () => {});
    }
});
console.log("fun.js loaded");