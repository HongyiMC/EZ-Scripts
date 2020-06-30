import {
	onPlayerInitialized
} from "ez:player";

const system = server.registerSystem(0, 0);

onPlayerInitialized(player => {
	let playerName = player.name
	let runCMD = system.executeCommand
	//add old objectives, if not added already
	runCMD(`scoreboard objectives add old dummy`,{});
	//update all player's old score
	runCMD(`execute @a[name="${playerName}"] ~ ~ ~ scoreboard players add @s old 0`,{});
	//title greeting new players
	runCMD(`execute @a[name="${playerName}",scores={old=0}] ~ ~ ~ title @s title §aWelcome to\n§eInto§6CMD\n§b@s`,{});
	//global alart all player a new players has joined
	runCMD(`execute @a[name="${playerName}",scores={old=0}] ~ ~ ~ tellraw @a {"rawtext":[{"text":"§d${playerName} just joined IntoCMD for the first time!!!"}]}`,{});
	//title greeting old players
	runCMD(`execute @a[name="${playerName}",scores={old=1}] ~ ~ ~ title @s title §aWelcome back\n§b@s`,{});
	//set new player to old player
	runCMD(`execute @a[name="${playerName}",scores={old=0}] ~ ~ ~ scoreboard players set @s old 1`,{});
})
//output log to console
console.log("playerJoin.js loaded");