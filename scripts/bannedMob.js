const system = server.registerSystem(0, 0);

system.listenForEvent("minecraft:entity_created", (eventData) => {
		const entityCreated = eventData.data.entity
		let entityIdentifier = entityCreated.__identifier__.replace("minecraft:", "");
		
		const bannedMobs = {
			"wither" : entityIdentifier
		};
		
		if (entityIdentifier in bannedMobs) {
			system.executeCommand(`kill @e[type=${entityIdentifier}]`, () => {});
		}
	}
)
console.log("bannedMob.js loaded");