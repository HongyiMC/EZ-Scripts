import {
	getBalance,
	updateBalance
} from "ez:economy";

import {
	executeCommand,
	registerCommand,
	registerOverride
} from "ez:command";

//edit the percentage of tax here
let taxPercentage = 5
//edit the least amount of money a player can send
let leastAmount = 20

registerCommand("pay", "Transfer balance to other players.", 0);
registerOverride("pay", [{type: "players", name: "player", optional: false}, {type: "int", name: "amount", optional: false}], function (targets, count) {
	if (targets.length != 1) throw "You can only pay money to 1 player at a time.";
	let sender = this.player
	let target = targets[0];
	let senderName = sender.name
	let targetName = target.name
	let finalAmount = Math.round((100 - taxPercentage) * count / 100)
	if (this.player) {
		if (count < leastAmount) {
			throw "No Transactions under $" + leastAmount + " please.";
		}else {
			updateBalance(sender, -count, "deduct");
			updateBalance(target, finalAmount, "add");
			executeCommand("tellraw \"" + senderName + "\" {\"rawtext\":[{\"text\":\"§6You send §b" + targetName + " §e$" + count + "\n§atax: " + taxPercentage + "% §6They get §e$" + finalAmount + "\"}]}");
			executeCommand("tellraw \"" + targetName + "\" {\"rawtext\":[{\"text\":\"§b" + senderName + " §6send you §e$" + count + "\n§atax: " + taxPercentage + "% §6you got §e$" + finalAmount + "\"}]}");
		}
	}
});

console.log("pay.js loaded");
