import {
    updateBalance
} from "ez:economy";

import {
    getPlayerByNAME
} from "ez:player";


const system = server.registerSystem(0, 0);

system.listenForEvent("minecraft:entity_death", ({data: eventData}) => {
	const { entity, killer }= eventData
    let deadEntity = entity
    let killerName = system.getComponent(killer, "minecraft:nameable").data.name;
	let player = getPlayerByNAME(killerName);
	//console.log(JSON.stringify(deadEntity));
	
    if ("minecraft:zombie" === deadEntity.__identifier__) {
		updateBalance(player,1,'add')
    }
	if ("minecraft:zombie_villager_v2" === deadEntity.__identifier__) {
		updateBalance(player,1,'add')
    }
	if ("minecraft:husk" === deadEntity.__identifier__) {
		updateBalance(player,1,'add')
    }
	if ("minecraft:skeleton" === deadEntity.__identifier__) {
		updateBalance(player,1,'add')
    }
	if ("minecraft:stray" === deadEntity.__identifier__) {
		updateBalance(player,1,'add')
    }
	if ("minecraft:creeper" === deadEntity.__identifier__) {
		updateBalance(player,1,'add')
    }
	if ("minecraft:spider" === deadEntity.__identifier__) {
		updateBalance(player,1,'add')
    }
	if ("minecraft:cave_spider" === deadEntity.__identifier__) {
		updateBalance(player,1,'add')
    }
	if ("minecraft:witch" === deadEntity.__identifier__) {
		updateBalance(player,2,'add')
    }
	if ("minecraft:phantom" === deadEntity.__identifier__) {
		updateBalance(player,2,'add')
    }
	if ("minecraft:blaze" === deadEntity.__identifier__) {
		updateBalance(player,2,'add')
    }
	if ("minecraft:ghast" === deadEntity.__identifier__) {
		updateBalance(player,3,'add')
    }
	if ("minecraft:ender_dragon" === deadEntity.__identifier__) {
		updateBalance(player,200,'add')
    }
  }
)
console.log("mobReward.js loaded");