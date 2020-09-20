import {
    executeCommand,
	registerCommand,
	registerOverride
} from "ez:command";

registerCommand("suicide", "Commit suicide.", 0);
registerCommand("info", "Show your connection info.", 0);

registerCommand("bc", "Broadcast a message.", 1);
registerCommand("smite", "Smite players.", 1);

registerOverride("suicide", [], function () {
	if (this.entity)
		this.entity.kill()
});
registerOverride("info", [], function () {
	if (this.player) {
		let playerName = this.player.name;
		let playerXuid = this.player.xuid;
		let playerUuid = this.player.uuid;
		let playerIP = this.player.address.split("|")[0]
		let playerPort = this.player.address.split("|")[1]
		executeCommand(`tellraw "${playerName}" {"rawtext":[{"text":"§b---§e${playerName}§b---\n§eXUID: §6${playerXuid}\n§aUUID: §6${playerUuid}\n§bIP: §6${playerIP}\n§5Port: §6${playerPort}\n§aDont worry only you can see the info above."}]}`);
	}
});

registerOverride("bc", [{type: "string", name: "text", optional: false}], function (content) {
	executeCommand(`tellraw @a {"rawtext":[{"text":"${content}"}]}`)
});
registerOverride("smite", [{type: "players", name: "player", optional: false}], function (targets) {
	if (targets.length != 1) throw "You can only smite 1 player at a time.";
	let smiteName = this.player.name
	let targetName = targets[0].name;
	executeCommand(`execute "${targetName}" ~ ~ ~ summon lightning_bolt`);
	executeCommand(`tellraw @a {"rawtext":[{"text":"§6${targetName} §egot smited by §b${smiteName}"}]}`)
});

console.log("essentialsPlus.js loaded");