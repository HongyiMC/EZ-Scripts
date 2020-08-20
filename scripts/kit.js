import {
	executeCommand,
	registerCommand,
	registerOverride,
	addEnum
} from "ez:command";

registerCommand("kit", "Recieve kits.", 0);
addEnum("selectKit", ["starter"]);
registerOverride("kit", [{type: "enum", name: "selectKit", optional: false, enum: "selectKit"}], function () {
	let playerName = this.player.name;
	executeCommand(`give @a[tag=!kitStarter,name=${playerName}] iron_sword`);
	executeCommand(`give @a[tag=!kitStarter,name=${playerName}] iron_pickaxe`);
	executeCommand(`give @a[tag=!kitStarter,name=${playerName}] iron_shovel`);
	executeCommand(`give @a[tag=!kitStarter,name=${playerName}] cooked_beef 32`);
	executeCommand(`give @a[tag=!kitStarter,name=${playerName}] shield`);
	executeCommand(`give @a[tag=!kitStarter,name=${playerName}] iron_helmet`);
	executeCommand(`give @a[tag=!kitStarter,name=${playerName}] iron_chestplate`);
	executeCommand(`give @a[tag=!kitStarter,name=${playerName}] iron_leggings`);
	executeCommand(`give @a[tag=!kitStarter,name=${playerName}] iron_boots`);
	executeCommand(`tellraw @a[tag=kitStarter,name=${playerName}] {"rawtext":[{"text":"§cYou have already claimed your starter kit."}]}`);
	executeCommand(`tag @a[tag=!kitStarter,name=${playerName}] add kitStarter`);
});

console.log("kit.js loaded");