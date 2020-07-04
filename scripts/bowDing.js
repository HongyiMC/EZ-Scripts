import {
	executeCommand
} from "ez:command";

const system = server.registerSystem(0, 0);

system.listenForEvent("minecraft:entity_hurt", ({data: eventData}) => {
	const { 
		attacker,
		entity,
		cause
	} = eventData
	const attackerName = system.getComponent(attacker, "minecraft:nameable").data.name;
	if (cause === "projectile") {
		system.executeCommand(`execute "${attackerName}" ~ ~ ~ playsound random.orb @s ~ ~ ~ 0.4 0.5`, () => {});
		
	}
})
console.log("bowDing.js loaded");