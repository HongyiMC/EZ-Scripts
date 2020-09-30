import {
	getBalance,
	updateBalance
} from "ez:economy";

import {
    executeCommand,
	registerCommand,
	registerOverride
} from "ez:command";

const system = server.registerSystem(0, 0);

const seaLevel = 63

registerCommand("suicide", "Commit suicide.", 0);
registerCommand("info", "Show your connection info.", 0);
registerCommand("balcheck", "Check other player's balance.", 0);
registerCommand("depth", "Displays your current block depth.", 0);

registerCommand("bc", "Broadcast a message.", 1);
registerCommand("smite", "Smite players.", 1);

registerOverride("suicide", [], function () {
	if (this.entity) {
		this.entity.kill();
	}else throw ["error, this command can only be used in game!"];
});
registerOverride("info", [], function () {
	if (this.player) {
		let playerName = this.player.name;
		let playerXuid = this.player.xuid;
		let playerUuid = this.player.uuid;
		let playerIP = this.player.address.split("|")[0];
		let playerPort = this.player.address.split("|")[1];
		executeCommand(`tellraw "${playerName}" {"rawtext":[{"text":"§b---§e${playerName}§b---\n§eXUID: §6${playerXuid}\n§aUUID: §6${playerUuid}\n§bIP: §6${playerIP}\n§5Port: §6${playerPort}\n§aDont worry only you can see the info above."}]}`);
	}else throw ["error, this command can only be used in game!"];
});
registerOverride("balcheck", [{type: "players", name: "player", optional: false}], function (targets) {
	if (targets.length != 1) throw "You can only check 1 player's balance at a time.";
	let targetName = targets[0].name;
	let targetBal = getBalance(targets[0]);
	if (this.player) {
		let thisName = this.player.name;
		executeCommand(`tellraw "${thisName}" {"rawtext":[{"text":"§e${targetName}'s balance: §b${targetBal}"}]}`);
		if (targetName === thisName) executeCommand(`tellraw "${thisName}" {"rawtext":[{"text":"§6tips:\n§eyou can just use §3/balance §eto check your own balance"}]}`);
	}else throw[targetName + "'s balance: " + targetBal];
});
registerOverride("depth", [], function () {
	if (this.entity) {
		let playerName = this.player.name;
		let yPos = Math.floor(system.getComponent(this.entity.vanilla, "minecraft:position").data.y);
		if (yPos > seaLevel) {
			let yDifference = yPos - seaLevel
			executeCommand(`tellraw "${playerName}" {"rawtext":[{"text":"§6You are §c${yDifference} §6block(s) above sea level."}]}`);
		}else if (yPos < seaLevel) {
			let yDifference = seaLevel - yPos
			executeCommand(`tellraw "${playerName}" {"rawtext":[{"text":"§6You are §c${yDifference} §6block(s) below sea level."}]}`);
		}else executeCommand(`tellraw "${playerName}" {"rawtext":[{"text":"§6You are at sea level."}]}`);
	}else throw ["error, this command can only be used in game!"];
})

registerOverride("bc", [{type: "string", name: "text", optional: false}], function (content) {
	executeCommand(`tellraw @a {"rawtext":[{"text":"${content}"}]}`);
});
registerOverride("smite", [{type: "players", name: "player", optional: false}], function (targets) {
	if (targets.length != 1) throw "You can only smite 1 player at a time.";
	let targetName = targets[0].name;
	executeCommand(`execute "${targetName}" ~ ~ ~ summon lightning_bolt`);
	if (this.player) {
		let smiteName = this.player.name;
		executeCommand(`tellraw @a {"rawtext":[{"text":"§6${targetName} §egot smited by §b${smiteName}"}]}`);
	}else executeCommand(`tellraw @a {"rawtext":[{"text":"§6${targetName} §egot smited by §bServer"}]}`);
});

console.log("essentialsPlus.js loaded");