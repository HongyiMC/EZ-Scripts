import {
    executeCommand,
	registerCommand,
	registerOverride
} from "ez:command";

registerCommand("suicide", "Commit suicide.", 0);
registerCommand("info", "Show your connection info.", 0);
registerCommand("bc", "Broadcast a message.", 1);

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

console.log("essentialsPlus.js loaded");