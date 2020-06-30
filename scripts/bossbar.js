import {
	onPlayerInitialized
} from "ez:player";

import {
	create
} from "ez:bossbar";

const system = server.registerSystem(0, 0);

onPlayerInitialized(player => {
	//player: PlayerEntry, text: string, percent: number
	create(player,'§e§lInto§6CMD §r§7Season §b8',100)
	console.log("bossbar activated for " + player.name);
})
console.log("bossbar.js loaded");