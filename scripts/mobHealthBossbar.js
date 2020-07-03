import {
    getPlayerByNAME
} from "ez:player";

import {
    create
} from "ez:bossbar";

const system = server.registerSystem(0, 0);

function percentage(healthNow, healthMax)
{
  return (healthNow/healthMax);
}

system.listenForEvent("minecraft:entity_hurt", ({data: eventData}) => {
    const { 
        attacker,
        damage,
        entity
    } = eventData;
    if (entity.__identifier__ === "minecraft:player") return;
	const healthMax = system.getComponent(entity, "minecraft:health").data.max;
	const healthBefore = system.getComponent(entity, "minecraft:health").data.value;
	const healthNow = healthBefore - damage;
	let healthPercentage = percentage(healthNow, healthMax);
    const hitter = system.getComponent(attacker, "minecraft:nameable").data.name;
    const hitterName = getPlayerByNAME(hitter);
	const bar = create(hitterName,entity.__identifier__,healthPercentage);
	setTimeout(() => bar.destory(), 10);
    //console.log(hitterName.name + " hit " + entity.__identifier__, healthMax, healthBefore, damage, healthNow, healthPercentage);
	if (healthPercentage < 0) {
		let healthPercentage = 0
		bar
	}
	else {
		bar
	}
})
console.log("mobHealthBossbar.js loaded");