import {
    getPlayerByNAME
} from "ez:player";

import {
    onChat
} from "ez:chat";

const system = server.registerSystem(0, 0);
console.log("chatCMD.js loaded");

let suicide = ['.suicide'];
let info = ['.info'];

onChat((cmdObject) => {
    try {
        if (cmdObject.content === suicide[0]) {
			system.executeCommand(`kill "${cmdObject.sender}"`, () => {});
        }
		if (cmdObject.content === info[0]) {
			let player = getPlayerByNAME(cmdObject.sender);
			let playerName = player.name;
			let playerXuid = player.xuid;
			let playerUuid = player.uuid;
			let playerIP = player.address.split("|")[0]
			let playerPort = player.address.split("|")[1]
			system.executeCommand(`tellraw "${playerName}" {"rawtext":[{"text":"§b---§e${playerName}§b---\n§eXUID: §6${playerXuid}\n§aUUID: §6${playerUuid}\n§bIP: §6${playerIP}\n§5Port: §6${playerPort}"}]}`, () => {});
        }
    } catch(err) {
        console.error(err);
    }
});