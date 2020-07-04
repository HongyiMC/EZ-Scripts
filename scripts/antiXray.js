const system = server.registerSystem(0, 0);

system.listenForEvent("minecraft:player_destroyed_block", ({data: eventData}) => {
		const {
			player: entity,
			block_identifier: blockName,
			block_position: blockPosition
		} = eventData
		let entityName = system.getComponent(entity, "minecraft:nameable" ).data.name
		
		const mineBlocks = {
			"minecraft:iron_ore" : blockName,
			"minecraft:gold_ore": blockName,
			"minecraft:diamond_ore": blockName,
			"minecraft:lapis_ore": blockName,
			"minecraft:redstone_ore": blockName,
			"minecraft:lit_redstone_ore": blockName,
			"minecraft:coal_ore": blockName,
			"minecraft:emerald_ore": blockName,
			"minecraft:quartz_ore": blockName,
			"minecraft:nether_gold_ore": blockName
		}
		if (blockName in mineBlocks) {
			system.executeCommand(`tellraw @a[tag=staff] {"rawtext":[{"text":"§3${entityName}§7 mined §f${blockName.replace("minecraft:","")}§7 at §6${Object.values(blockPosition).join(", ")}"}]}`, () => {})
		}
	}
)
console.log("antiXray.js loaded");