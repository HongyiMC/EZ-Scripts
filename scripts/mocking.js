//mocking player's chat when player typed something in game

import {
    onChat
} from "ez:chat";

import {
    executeCommand
} from "ez:command";

//customize the probability of a player's chat getting mocked by
let mockPercentage = 1
//customize who is mocking the player
let mockByWho = "§eInto§6CMD"

function flipCase(str) { 
	var flip = '';
	for (var i = 0; i < str.length; i++) {
		if (Math.random() > .5){
			flip += str.charAt(i).toUpperCase();
		} else {
			flip += str.charAt(i).toLowerCase();
		}
	}
	return flip;
}

onChat((chat)=> {
	const probability = mockPercentage/100;
	if (probability >= Math.random()){
		const mockChat = "<" + mockByWho + "§r> Imagine saying: §e" + flipCase(chat.content);
		executeCommand("tellraw @a {\"rawtext\":[{\"text\":\"" + mockChat + "\"}]}");
	}
});

console.log("mocking.js loaded");
