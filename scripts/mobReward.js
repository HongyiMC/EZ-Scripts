import {
	getBalance,
	updateBalance
} from "ez:economy";

import {
	getPlayerByNAME
} from "ez:player";


const system = server.registerSystem(0, 0);

function randomReward(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

//customize the percentage of player losing money when get killed by another player
let LootPercentage = 5

//customize how much money should a mob drop (min, max)
const mobs = {
	"zombie" : randomReward(1,1),
	"zombie_villager_v2" : randomReward(1,1),
	"husk" : randomReward(1,1),
	"skeleton" : randomReward(1,1),
	"stray" : randomReward(1,1),
	"creeper" : randomReward(1,1),
	"spider" : randomReward(1,1),
	"cave_spider" : randomReward(1,1),
	"witch" : randomReward(2,3),
	"phantom" : randomReward(1,2),
	"blaze" : randomReward(2,2),
	"ghast" : randomReward(3,3),
	"ender_dragon" : randomReward(200,200),
	"piglin" : randomReward(1,3),
	"zoglin" : randomReward(2,5),
	"player" : randomReward(1,1)
};

function percentage(num){
	if (LootPercentage > 100) {
		console.log("Please do not enter a percentage that is higher than 100")
		let LootPercentage = 100
		return (num/100)*LootPercentage;
	}
	else {
		return (num/100)*LootPercentage;
	}
}

system.listenForEvent("minecraft:entity_death", ({data: eventData}) => {
	const {
		entity: deadEntity,
		killer
	} = eventData;
	const kill = system.getComponent(killer, "minecraft:nameable").data.name;
	const deadEntityIdentifier = deadEntity.__identifier__.replace("minecraft:", "");
	const killerName = getPlayerByNAME(kill);
	
	if (deadEntityIdentifier in mobs) {
		if (deadEntity.__identifier__ === "minecraft:player") {
			let moneyOld = getBalance(killerName)
			const victim = system.getComponent(deadEntity, "minecraft:nameable").data.name;
			const victimName = getPlayerByNAME(victim);
			const victimMoney = getBalance(victimName);
			const result = percentage(victimMoney);
			const victimLoot = Math.round(result);
			const deductVictimLoot = victimLoot * -1
			updateBalance(killerName, victimLoot, "add")
			system.executeCommand(`title "${killerName.name}" actionbar §fYou earned §e$${victimLoot} §a(${LootPercentage} Percent) §ffor killing §6${victimName.name}\n§7Previous: §b${moneyOld} §7=> Now: §b${getBalance(killerName)}`, () => {});
			updateBalance(victimName, deductVictimLoot, "deduct")
			system.executeCommand(`title "${victimName.name}" actionbar §fYou lost §e$${victimLoot} §a(${LootPercentage} Percent) §ffor getting killed by §6${victimName.name}\n§7Previous: §b${moneyOld} §7=> Now: §b${getBalance(killerName)}`, () => {});
		}
		else {
			let moneyOld = getBalance(killerName)
			updateBalance(killerName, mobs[deadEntityIdentifier], "add");
			system.executeCommand(`title "${killerName.name}" actionbar §fYou earned §e$${mobs[deadEntityIdentifier]} §ffor killing §6${deadEntity.__identifier__}\n§7Previous: §b${moneyOld} §7=> Now: §b${getBalance(killerName)}`, () => {});
		}
	}
	else{
		system.executeCommand(`title "${killerName.name}" actionbar §fYou killed §6${deadEntity.__identifier__}`, () => {});
	}
})
console.log("mobReward.js loaded");
