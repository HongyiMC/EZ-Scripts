const system = server.registerSystem(0, 0);

system.listenForEvent("minecraft:player_destroyed_block", ({data: eventData}) => {
		const {
			player: entity,
			block_identifier: blockName,
			block_position: blockPosition
		} = eventData
		let entityName = system.getComponent(entity, "minecraft:nameable" ).data.name
		
		if (blockName == "minecraft:iron_ore") {
			system.executeCommand(`tellraw @a[tag=staff] {"rawtext":[{"text":"§3${entityName}§7 mined §f${blockName.replace("minecraft:","")}§7 at §6${Object.values(blockPosition).join(", ")}"}]}`, () => {})
		}
		if (blockName == "minecraft:gold_ore") {
			system.executeCommand(`tellraw @a[tag=staff] {"rawtext":[{"text":"§3${entityName}§7 mined §f${blockName.replace("minecraft:","")}§7 at §6${Object.values(blockPosition).join(", ")}"}]}`, () => {})
		}
		if (blockName == "minecraft:diamond_ore") {
			system.executeCommand(`tellraw @a[tag=staff] {"rawtext":[{"text":"§3${entityName}§7 mined §f${blockName.replace("minecraft:","")}§7 at §6${Object.values(blockPosition).join(", ")}"}]}`, () => {})
		}
		if (blockName == "minecraft:lapis_ore") {
			system.executeCommand(`tellraw @a[tag=staff] {"rawtext":[{"text":"§3${entityName}§7 mined §f${blockName.replace("minecraft:","")}§7 at §6${Object.values(blockPosition).join(", ")}"}]}`, () => {})
		}
		if (blockName == "minecraft:redstone_ore") {
			system.executeCommand(`tellraw @a[tag=staff] {"rawtext":[{"text":"§3${entityName}§7 mined §f${blockName.replace("minecraft:","")}§7 at §6${Object.values(blockPosition).join(", ")}"}]}`, () => {})
		}
		if (blockName == "minecraft:lit_redstone_ore") {
			system.executeCommand(`tellraw @a[tag=staff] {"rawtext":[{"text":"§3${entityName}§7 mined §f${blockName.replace("minecraft:","")}§7 at §6${Object.values(blockPosition).join(", ")}"}]}`, () => {})
		}
		if (blockName == "minecraft:coal_ore") {
			system.executeCommand(`tellraw @a[tag=staff] {"rawtext":[{"text":"§3${entityName}§7 mined §f${blockName.replace("minecraft:","")}§7 at §6${Object.values(blockPosition).join(", ")}"}]}`, () => {})
		}
		if (blockName == "minecraft:emerald_ore") {
			system.executeCommand(`tellraw @a[tag=staff] {"rawtext":[{"text":"§3${entityName}§7 mined §f${blockName.replace("minecraft:","")}§7 at §6${Object.values(blockPosition).join(", ")}"}]}`, () => {})
		}
		if (blockName == "minecraft:quartz_ore") {
			system.executeCommand(`tellraw @a[tag=staff] {"rawtext":[{"text":"§3${entityName}§7 mined §f${blockName.replace("minecraft:","")}§7 at §6${Object.values(blockPosition).join(", ")}"}]}`, () => {})
		}
	}
)
console.log("antiXray.js loaded");