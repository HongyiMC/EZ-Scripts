import {
	executeCommand,
	registerCommand,
	registerOverride
} from "ez:command";

import {
	send
} from "ez:formui";

registerCommand("guiform", "Open image gui.", 0);
registerOverride("guiform", [], function () {
	if (this.player) {
		send(this.player, {
			"type": "form",
			"title": "§eTell me about you",
			"content": "Are you handsome?",
			"buttons": [
				{
					"text": "§l§aYES",
					"image": {
						"type": "url",
						"data": "https://raw.githubusercontent.com/HongyiMC/EZ-Scripts/master/scripts/gui_images/yes.png?raw=true"
					}
				},
				{
					"text": "§l§cNO",
					"image": {
						"type": "url",
						"data": "https://raw.githubusercontent.com/HongyiMC/EZ-Scripts/master/scripts/gui_images/no.png?raw=true"
					}
				}
			]
		}, data => {
			if (data == null) return;
			let playerName = this.player.name
			if (data == 0) executeCommand("tellraw \"" + playerName + "\" {\"rawtext\":[{\"text\":\"§aYou are a handsome boy.\"}]}");
			else executeCommand("tellraw \"" + playerName + "\" {\"rawtext\":[{\"text\":\"§cEww go away...\"}]}");
		}
	);
    return null
  }
  throw ["error, this command can only be used in game!", "/guiform"]
});

console.log("guiform.js loaded");