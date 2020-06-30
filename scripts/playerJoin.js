import {
	onPlayerInitialized
} from "ez:player";

const system = server.registerSystem(0, 0);

//output log to console
console.log("playerJoin.js loaded");

onPlayerInitialized(player => {
	let playerName = player.name
	//add old objectives, if not added already
	system.executeCommand(`scoreboard objectives add old dummy`,{});
	//update all player's old score
	system.executeCommand(`execute @a[name="${playerName}"] ~ ~ ~ scoreboard players add @s old 0`,{});
  //title greeting new players
	system.executeCommand(`execute @a[name="${playerName}",scores={old=0}] ~ ~ ~ title @s title §aДобро пожаловать на\n§9Cool§aMC§a,\n§b@s`,{});
	//global alart all player a new players has joined
  system.executeCommand(`execute @a[name="${playerName}",scores={old=0}] ~ ~ ~ tellraw @a {"rawtext":[{"text":"§d${playerName} пришел к нам впервые!"}]}`,{});
	//title greeting old players
  system.executeCommand(`execute @a[name="${playerName}",scores={old=1}] ~ ~ ~ title @s title §aС возвращением,\n§b@s`,{});
	//set new player to old player
  system.executeCommand(`execute @a[name="${playerName}",scores={old=0}] ~ ~ ~ scoreboard players set @s old 1`,{});
})
