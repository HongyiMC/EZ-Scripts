const system = server.registerSystem(0, 0);

system.listenForEvent("minecraft:weather_changed", ({data: eventData}) => {
	const {
		raining,
		lightning
	} = eventData
	if (raining === true){
		if (lightning === true){
			system.executeCommand(`tellraw @a {"rawtext":[{"text":"§aAnd as the sound of the trumpet grew louder and louder, Moses spoke, and God answered him in thunder.\n§7- §eExodus 19:19"}]}`, () => {});
		}
		else system.executeCommand(`tellraw @a {"rawtext":[{"text":"§aHe provides rain for the earth; he sends water on the countryside.\n§7- §eJob 5:10"}]}`, () => {});
	}
	else system.executeCommand(`tellraw @a {"rawtext":[{"text":"§aThe light is pleasant, and it is good for the eyes to see the sun.\n§7- §eEcclesiastes 11:7"}]}`, () => {});
})
console.log("weather.js loaded");