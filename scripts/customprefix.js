import {
	updateBalance
} from "ez:economy";

import {
	executeCommand,
	registerCommand,
	registerOverride
} from "ez:command";

import {
	send
} from "ez:formui";

registerCommand("customprefix", "Open custom prefix store.", 0);
registerOverride("customprefix", [], function () {
	if (this.player) {
		const price = 6000
		send(this.player, {
			type: "custom_form",
			title: "§l§aCustom §bPrefix §eStore",
			content: [
				{
					"type": "label",
					"text": "§6Price: §e$" + price
				},
				{
					"type": "toggle",
					"text": "Bold",
					"default": false
				},
				{
					"type": "input",
					"text": "insert prefix below",
					"placeholder": "Prefix"
				}
			]
		}, data => {
			if (data == null) return;
			let playerName = this.player.name
			let [placeholder, bold, prefix] = data;
			try {
				updateBalance(this.player, -price, "change prefix");
				if (bold) executeCommand("custom-name set prefix \"" + playerName + "\" \"§r§7~§r§l" + prefix + " §r\"");
				else executeCommand("custom-name set prefix \"" + playerName + "\" \"§r§7~§r" + prefix + " §r\"");
			} catch {
				executeCommand("tellraw \"" + playerName + "\" {\"rawtext\":[{\"text\":\"§cno can do\"}]}");
			}
		}
	);
    return null
  }
  throw ["error, this command can only be used in game!", "/customprefix"]
});

console.log("customprefix.js loaded");