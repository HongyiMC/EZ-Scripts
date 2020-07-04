const system = server.registerSystem(0, 0);

system.listenForEvent("minecraft:player_attacked_entity", ({data: eventData}) => {
	const { 
		player: entity,
		attacked_entity: attackedEntity
		
	} = eventData

	let particleEventData = system.createEventData( "minecraft:spawn_particle_attached_entity" )
	particleEventData.data.effect = "minecraft:redstone_ore_dust_particle"
	particleEventData.data.offset = [ 0, 1, 0 ]
	particleEventData.data.entity = attackedEntity
	system.broadcastEvent("minecraft:spawn_particle_attached_entity", particleEventData)
})
console.log("attackParticle.js loaded");