import {
    onChat
} from "ez:chat";

const system = server.registerSystem(0, 0);

const foo = {
    "marco" : "polo",
    "lol" : "Whats so funny",
    "Hongyi is handsome" : "He is super handsome",
    "Hongyi is ugly" : "Your mom is ugly",
    "Who is Candice" : "Candice d**k fit in your mouth?",
    "who is candice" : "Candice d**k fit in your mouth?",
    "Who is candice" : "Candice d**k fit in your mouth?",
    "who is Candice" : "Candice d**k fit in your mouth?",
    "here come dat boi" : "oh sh*t waddup!"
};

onChat( ({ content }) => {
    if (content in foo) {
        const rawText = {
            rawtext : [{
                text : "<§eInto§6CMD§r> " + foo[content]
            }]
        };
        system.executeCommand(`tellraw @a ${JSON.stringify(rawText)}`, () => {});
    }
});
console.log("fun.js loaded");