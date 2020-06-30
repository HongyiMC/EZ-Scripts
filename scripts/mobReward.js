import {
    updateBalance
} from "ez:economy";

import {
    getPlayerByNAME
} from "ez:player";


const system = server.registerSystem(0, 0);

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
        "zombie" : 1,
        "zombie_villager_v2" : 1,
        "husk" : 1,
        "skeleton" : 1,
        "stray" : 1,
        "creeper" : 1,
        "spider" : 1,
        "cave_spider" : 1,
        "witch" : 2,
        "phantom" : 2,
        "blaze" : 2,
        "ghast" : 3,
        "ender_dragon" : 200
    };
    
    if (deadEntityIdentifier in mobs) {
        updateBalance(player, mobs[deadEntityIdentifier], "add");
    }
  }
)
console.log("mobReward.js loaded");