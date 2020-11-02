import {
	getBalance,
	updateBalance
} from "ez:economy";

import {
    executeCommand,
	registerCommand,
	registerOverride,
	addEnum
} from "ez:command";

const system = server.registerSystem(0, 0);

//define sea level
const seaLevel = 63
//define how many block you can tp using /top and /down
let testBlockNum = 100;
//most mobs can be spawned with custom summon
const mostSpawnAmount = 50

registerCommand("suicide", "Commit suicide.", 0);
registerCommand("info", "Show your connection info.", 0);
registerCommand("balcheck", "Check other player's balance.", 0);
registerCommand("depth", "Displays your current block depth.", 0);

registerCommand("bc", "Broadcast a message.", 1);
registerCommand("smite", "Smite players.", 1);
registerCommand("top", "Teleport to the very top air block.", 1);
registerCommand("down", "Teleport to the very buttom air block.", 1);
registerCommand("punish", "punish a player.", 1);
registerCommand("summonmob", "Custom summon mobs.", 1);

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
});

registerOverride("bc", [{type: "string", name: "text", optional: false}], function (content) {
	executeCommand(`tellraw @a {"rawtext":[{"text":"${content}"}]}`);
});
registerOverride("smite", [{type: "players", name: "player", optional: false}], function (targets) {
	if (targets.length != 1) throw "You can only smite 1 player at a time.";
	let targetName = targets[0].name;
	executeCommand(`execute "${targetName}" ~ ~ ~ summon lightning_bolt`);
	if (this.player) {
		let smiteName = this.player.name;
		executeCommand(`tellraw @a {"rawtext":[{"text":"§6${targetName} §egot smote by §b${smiteName}"}]}`);
	}else executeCommand(`tellraw @a {"rawtext":[{"text":"§6${targetName} §egot smote by §bServer"}]}`);
});
registerOverride("top", [], function () {
	if (this.player) {
		var tickingArea = system.getComponent(this.entity.vanilla, "minecraft:tick_world").data.ticking_area;
		let playerName = this.player.name
		let playerPos = system.getComponent(this.entity.vanilla, "minecraft:position").data;
		let playerPosX = playerPos.x;
		let playerPosY = Math.floor(playerPos.y);
		let playerPosZ = playerPos.z;
		for (var i = 1; i < testBlockNum; i++) {
			var curBlock = system.getBlock(tickingArea, playerPosX, playerPosY + i, playerPosZ).__identifier__;
			var nextBlock = system.getBlock(tickingArea, playerPosX, playerPosY + i + 1, playerPosZ).__identifier__;
			var next2Block = system.getBlock(tickingArea, playerPosX, playerPosY + i + 2, playerPosZ).__identifier__;
			if (curBlock != "minecraft:air" && nextBlock == "minecraft:air" && next2Block == "minecraft:air") {
				system.executeCommand("tp @a[name=\"" + this.name + "\"] " + playerPosX + " " + (playerPosY + i + 1) + " " + playerPosZ, function(data) {});
				i = testBlockNum + 1;
			}
			if (i == testBlockNum - 1) {
				throw "No safe air block found in " + testBlockNum + " blocks above";
			}
		}
	}else throw ["error, this command can only be used in game!"];
});
registerOverride("down", [], function () {
	if (this.player) {
		var tickingArea = system.getComponent(this.entity.vanilla, "minecraft:tick_world").data.ticking_area;
		let playerName = this.player.name
		let playerPos = system.getComponent(this.entity.vanilla, "minecraft:position").data;
		let playerPosX = playerPos.x;
		let playerPosY = Math.floor(playerPos.y);
		let playerPosZ = playerPos.z;
		for (var i = 2; i < testBlockNum; i++) {
			var curBlock = system.getBlock(tickingArea, playerPosX, playerPosY - i, playerPosZ).__identifier__;
			var nextBlock = system.getBlock(tickingArea, playerPosX, playerPosY - i + 1, playerPosZ).__identifier__;
			var next2Block = system.getBlock(tickingArea, playerPosX, playerPosY - i + 2, playerPosZ).__identifier__;
			if (curBlock != "minecraft:air" && nextBlock == "minecraft:air" && next2Block == "minecraft:air") {
				system.executeCommand("tp @a[name=\"" + this.name + "\"] " + playerPosX + " " + (playerPosY - i + 1) + " " + playerPosZ, function(data) {});
				i = testBlockNum + 1;
			}
			if (i == testBlockNum - 1) {
				throw "No safe air block found in " + testBlockNum + " blocks below";
			}
		}
	}else throw ["error, this command can only be used in game!"];
});
addEnum("punish-type", ["ban", "kick"]);
registerOverride("punish", [{type: "enum", enum: "punish-type", name: "type", optional: false},{type: "players", name: "player", optional: false},{type: "string", name: "reason", optional: true}], function (type,targets,reason) {
	if (targets.length != 1) throw "You can only punish 1 player at a time.";
	let targetName = targets[0].name;
	var reason = (typeof reason === 'undefined') ? "no reason provided" : reason;
	if (type === 0) {
		executeCommand(`tellraw @a {"rawtext":[{"text":"§c${targetName} has been banned from the server.\n§bReason: §e${reason}"}]}`);
		executeCommand(`ban "${targetName}" "§cYou have been banned from the server\n§cReason: §e${reason}§r"`);
	}else {
		executeCommand(`tellraw @a {"rawtext":[{"text":"§c${targetName} has been kicked from the server.\n§bReason: §e${reason}"}]}`);
		executeCommand(`kick "${targetName}" "§e${reason}§r"`);
	}
});
registerOverride("summonmob", [{type: "players", name: "player", optional: false},{type: "string", name: "entityType", optional: false},{type: "int", name: "amount", optional: false},{type: "string", name: "nameTag", optional: false}], function (targets, mobType, amount, nameTag) {
	if (amount > mostSpawnAmount) throw "That is way too much to spawn.";
	if (targets.length != 1) throw "You can only spawn mobs for 1 player at a time.";
	let playerName = targets[0].name;
	for (var i = 0; i < amount; i++) {
		executeCommand(`execute "${playerName}" ~ ~ ~ summon ${mobType} ${nameTag}`);
	}
});

console.log("essentialsPlus.js loaded");