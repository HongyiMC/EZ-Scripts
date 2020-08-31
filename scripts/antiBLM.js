import {
    onChat
} from "ez:chat";

const system = server.registerSystem(0, 0);

let blm = ['blm'];
let blackLivesMatter = ['black lives matter'];
let alm = ['alm'];
let allLivesMatter = ['all lives matter'];

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
        if (clown.content.toLowerCase() === blm[0]) {
			system.executeCommand(`kill "${clown.sender}"`, () => {});
			system.executeCommand(`tellraw @a ${JSON.stringify(rawText1)}`, () => {});
        }
		if (clown.content.toLowerCase() === blackLivesMatter[0]) {
			system.executeCommand(`kill "${clown.sender}"`, () => {});
			system.executeCommand(`tellraw @a ${JSON.stringify(rawText1)}`, () => {});
        }
		if (clown.content.toLowerCase() === alm[0]) {
			system.executeCommand(`tellraw @a ${JSON.stringify(rawText2)}`, () => {});
        }
		if (clown.content.toLowerCase() === allLivesMatter[0]) {
			system.executeCommand(`tellraw @a ${JSON.stringify(rawText2)}`, () => {});
        }
    } catch(err) {
        console.error(err);
    }
});

console.log("antiBLM.js loaded");