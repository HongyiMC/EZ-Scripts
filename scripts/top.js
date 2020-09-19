import {
	executeCommand,
	registerCommand,
	registerOverride
} from "ez:command";

const system = server.registerSystem(0, 0);

let testBlockNum = 100;

registerCommand("top", "Teleport to the very top air block.", 1);

registerOverride("top", [], function () {
	var tickingArea = system.getComponent(this.entity.vanilla, "minecraft:tick_world").data.ticking_area;
	let playerName = this.player.name
	let playerPos = this.entity.pos;
	let playerPosX = playerPos.x;
	let playerPosY = playerPos.y;
	let playerPosZ = playerPos.z;
	for (var i = 1; i < testBlockNum; i++) {
		var curBlock = system.getBlock(tickingArea, playerPosX, playerPosY + i, playerPosZ).__identifier__;
		var nextBlock = system.getBlock(tickingArea, playerPosX, playerPosY + i + 1, playerPosZ).__identifier__;
		if (curBlock != "minecraft:air" && nextBlock == "minecraft:air") {
			system.executeCommand("tp @a[name=\"" + this.name + "\"] " + playerPosX + " " + (playerPosY + i + 0.38) + " " + playerPosZ, function(data) {});
			i = testBlockNum + 1;
		}
		if (i == testBlockNum - 1) {
			throw "No safe air block found in " + testBlockNum + " blocks";
		}
	}
});

console.log("top.js loaded");
