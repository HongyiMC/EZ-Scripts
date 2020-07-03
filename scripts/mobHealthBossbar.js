import {
	getPlayerByNAME
} from "ez:player";

import {
	create
} from "ez:bossbar";

const system = server.registerSystem(0, 0);

system.listenForEvent("minecraft:player_attacked_entity", ({data: eventData}) => {
	const { 
		player: entity,
		attacked_entity: attackedEntity
		
	} = eventData
	const health = system.getComponent(attackedEntity, "minecraft:health").data.value
	const healthMax = system.getComponent(attackedEntity, "minecraft:health").data.max
	const hitter = system.getComponent(entity, "minecraft:nameable").data.name;
	const hitterName = getPlayerByNAME(hitter);
	if (attackedEntity.__identifier__ === "minecraft:player") {
		return 0;
	}
	else {
		console.log(hitter + " hit " + attackedEntity.__identifier__, health, healthMax)
	}
})
console.log("mobHealthBossbar.js loaded");