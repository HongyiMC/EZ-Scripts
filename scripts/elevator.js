const system = server.registerSystem(0, 0);

//what block is used for elevator
let eBlockName = "minecraft:iron_block";
//max elevator teleport distance
let maxUpDis = 10;

system.listenForEvent("minecraft:entity_sneak", ({data: eventData}) => {
	const {
		entity,
		sneaking
	} = eventData
	let playerPos = system.getComponent(entity, "minecraft:position").data;
	let playerName = system.getComponent(entity, "minecraft:nameable" ).data.name;
	let pX = transNum(playerPos.x);
	let pY = transNum(playerPos.y);
	let pZ = transNum(playerPos.z);
	let bX = pX
	let bY = pY-1
	let bZ = pZ
	let tickAreaCmp = system.getComponent(entity, "minecraft:tick_world" /* TickWorld */);
	let tickingArea = tickAreaCmp.data.ticking_area;
	let ifFind = false;
	let block = system.getBlock(tickingArea, bX, bY, bZ);
	let blockName = block.__identifier__;
	if (blockName == eBlockName && sneaking === true) {
		for (let i = 1; i <= maxUpDis; i++) {
			let tblock = system.getBlock(tickingArea, bX, bY - i, bZ);
			let testBlockName = tblock.__identifier__;
			if (testBlockName == blockName) {
				let targetY = bY - i + 1
				system.executeCommand(`execute "${playerName}" ~ ~ ~ tp ~ ` + targetY + ` ~`, data => { });
				system.executeCommand(`playsound tile.piston.in "${playerName}" ${bX} ${targetY} ${bZ} 1 1`, data => { });
				ifFind = true;
				i = maxUpDis + 1;
			}
		}
		if (!ifFind) {
			system.executeCommand(`tellraw "${playerName}" {"rawtext":[{"text":"§cUnable to find ${eBlockName} in ${maxUpDis} blocks below"}]}`, data => { });
		}
	}
})

system.listenForEvent("minecraft:block_destruction_started", ({data: eventData}) => {
	const {
		player
	} = eventData
	let playerPos = getPosCmp(player);
	let playerName = system.getComponent(player, "minecraft:nameable" ).data.name;
	let pX = transNum(playerPos.x);
	let pY = transNum(playerPos.y);
	let pZ = transNum(playerPos.z);
	let bX = pX
	let bY = pY-1
	let bZ = pZ
	let tickAreaCmp = system.getComponent(player, "minecraft:tick_world" /* TickWorld */);
	let tickingArea = tickAreaCmp.data.ticking_area;
	let ifFind = false;
	let block = system.getBlock(tickingArea, bX, bY, bZ);
	let blockName = block.__identifier__;
	if (blockName == eBlockName) {
		for (let i = 1; i <= maxUpDis; i++) {
			let tblock = system.getBlock(tickingArea, bX, bY + i, bZ);
			let testBlockName = tblock.__identifier__;
			if (testBlockName == blockName) {
				let targetY = bY + i + 1
				system.executeCommand(`execute "${playerName}" ~ ~ ~ tp ~ ` + targetY + ` ~`, data => { });
				system.executeCommand(`playsound tile.piston.out "${playerName}" ${bX} ${targetY} ${bZ} 1 1`, data => { });
				i = maxUpDis + 1;
				ifFind = true;
			}
		}
		if (!ifFind) {
			system.executeCommand(`tellraw "${playerName}" {"rawtext":[{"text":"§cUnable to find ${eBlockName} in ${maxUpDis} blocks above"}]}`, data => { });
		}
	}
});

function transNum(n) {
	return Math.floor(n);
}
function getPosCmp(entity) {
	return system.getComponent(entity, "minecraft:position").data;
}

console.log("elevator.js loaded");