import {
    executeCommand,
	registerCommand,
	registerOverride
} from "ez:command";

registerCommand("xraytoggle", "Toggle xray alart for staff member.", 0);
registerOverride("xraytoggle", [{type: "bool", name: "value", optional: false}], function (toggleResult) {
	if (this.player) {
		let thisPlayer = this.player.name;
		if (toggleResult) {
			executeCommand(`tag @a[name="${thisPlayer}",tag=staff] add xrayAlert`);
			executeCommand(`tellraw @a[name="${thisPlayer}",tag=staff] {"rawtext":[{"text":"§aYou will now recieve ore mining alert"}]}`);
			executeCommand(`tellraw @a[name="${thisPlayer}",tag=!staff] {"rawtext":[{"text":"§cYou are not in staff team."}]}`);
		}else{
			executeCommand(`tag @a[name="${thisPlayer}",tag=staff] remove xrayAlert`);
			executeCommand(`tellraw @a[name="${thisPlayer}",tag=staff] {"rawtext":[{"text":"§6You will no longer recieve ore mining alert"}]}`);
			executeCommand(`tellraw @a[name="${thisPlayer}",tag=!staff] {"rawtext":[{"text":"§cYou are not in staff team."}]}`);
		}
	}else throw ["error, this command can only be used in game!", "/xraytoggle"];
});

console.log("xraytoggle.js loaded"); 