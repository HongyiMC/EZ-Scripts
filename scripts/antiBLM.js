import {
    onChat
} from "ez:chat";

const system = server.registerSystem(0, 0);

const blm = ['blm'];
const blackLivesMatter = ['blacklivesmatter'];
const alm = ['alm'];
const allLivesMatter = ['alllivesmatter'];

onChat((clown) => {
    try {
		const rawText1 = {
            rawtext : [{
                text : "<§eInto§6CMD§r> Naw bro All Lives Matter."
            }]
        };
		const rawText2 = {
            rawtext : [{
                text : "<§eInto§6CMD§r> Yes All Lives Matter."
            }]
        };
        if (clown.content.replace(/[^\w\t\r\n!?]/g,'').toLowerCase().includes(blm)) {
			system.executeCommand(`kill "${clown.sender}"`, () => {});
			system.executeCommand(`tellraw @a ${JSON.stringify(rawText1)}`, () => {});
        }
		if (clown.content.replace(/[^\w\t\r\n!?]/g,'').toLowerCase().includes(blackLivesMatter[0])) {
			system.executeCommand(`kill "${clown.sender}"`, () => {});
			system.executeCommand(`tellraw @a ${JSON.stringify(rawText1)}`, () => {});
        }
		if (clown.content.replace(/[^\w\t\r\n!?]/g,'').toLowerCase().includes(alm[0])) {
			system.executeCommand(`tellraw @a ${JSON.stringify(rawText2)}`, () => {});
        }
		if (clown.content.replace(/[^\w\t\r\n!?]/g,'').toLowerCase().includes(allLivesMatter[0])) {
			system.executeCommand(`tellraw @a ${JSON.stringify(rawText2)}`, () => {});
        }
    } catch(err) {
        console.error(err);
    }
});

console.log("antiBLM.js loaded");