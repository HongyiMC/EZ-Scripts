import {
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

system.listenForEvent("minecraft:entity_death", ({data: eventData}) => {
    const { 
        entity: deadEntity, 
        killer 
    } = eventData;
    const killerName = system.getComponent(killer, "minecraft:nameable").data.name;
    const deadEntityIdentifier = deadEntity.__identifier__.replace("minecraft:", "");
    const player = getPlayerByNAME(killerName);
    //console.log(JSON.stringify(deadEntity));
	
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
        "ender_dragon" : randomReward(200,200)
    };
    
    if (deadEntityIdentifier in mobs) {
        updateBalance(player, mobs[deadEntityIdentifier], "add");
		//console.log("Player " + player.name + " got $" + mobs[deadEntityIdentifier] + " for killing " + deadEntity.__identifier__);
    }
  }
)
console.log("mobReward.js loaded");