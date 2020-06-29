import {
	onPlayerInitialized
} from "ez:player";

const system = server.registerSystem(0, 0);
console.log("playerJoin.js loaded");

onPlayerInitialized(player => {
	let playerName = player.name
	system.executeCommand(`execute @a[name="${playerName}"] ~ ~ ~ scoreboard players add @s old 0`,{});
	system.executeCommand(`execute @a[name="${playerName}",scores={old=0}] ~ ~ ~ title @s title §aWelcome to\n§eInto§6CMD\n§b@s`,{});
	system.executeCommand(`execute @a[name="${playerName}",scores={old=0}] ~ ~ ~ tellraw @a {"rawtext":[{"text":"§d${playerName} just joined IntoCMD for the first time!!!"}]}`,{});
	system.executeCommand(`execute @a[name="${playerName}",scores={old=1}] ~ ~ ~ title @s title §aWelcome back\n§b@s`,{});
	system.executeCommand(`execute @a[name="${playerName}",scores={old=0}] ~ ~ ~ scoreboard players set @s old 1`,{});
})