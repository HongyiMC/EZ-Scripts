import {
	executeCommand,
	registerCommand,
	registerOverride
} from "ez:command";

import {
	send
} from "ez:formui";

const serverName = "§l§eInto§6CMD";
const ios = "§l§biOS";
const android = "§l§6Android";
const win10 = "§l§eWin10";
const xbox = "§l§aXbox";
const nintendo = "§l§cNS";
const playStation = "§l§9PS";

registerCommand("tech", "tell people what device you are playing on.", 0);
registerOverride("tech", [], function () {
	if (this.player) {
		send(this.player, {
			"type": "custom_form",
			"title": "§l§bDevice selection",
			"content": [
				{
					"type": "dropdown",
					"text": "Please select the device you are playing " + serverName + " §ron",
					"options": ["Please select one from below", ios, android, win10, xbox, nintendo, playStation]
				},
				{
					"type": "label",
					"text": "\n\n"
				}
			]
		}, data => {
			if (data === null) return;
			let [device, placeholder] = data;
			let playerName = this.player.name;
			if (device === 0) {
				executeCommand(`tellraw "${playerName}" {"rawtext":[{"text":"§cPlease select one option."}]}`);
			}
			if (device === 1) {
				executeCommand("custom-name set postfix \"" + playerName +"\" \" " + ios + "§r\"");
			}
			if (device === 2) {
				executeCommand("custom-name set postfix \"" + playerName +"\" \" " + android + "§r\"");
			}
			if (device === 3) {
				executeCommand("custom-name set postfix \"" + playerName +"\" \" " + win10 + "§r\"");
			}
			if (device === 4) {
				executeCommand("custom-name set postfix \"" + playerName +"\" \" " + xbox + "§r\"");
			}
			if (device === 5) {
				executeCommand("custom-name set postfix \"" + playerName +"\" \" " + nintendo + "§r\"");
			}
			if (device === 6) {
				executeCommand("custom-name set postfix \"" + playerName +"\" \" " + playStation + "§r\"");
			}
		});return null
	}else throw ["error, this command can only be used in game!"]
});

console.log("techSelect.js loaded");