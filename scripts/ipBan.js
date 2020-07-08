import {
	onPlayerJoined,
    getPlayerByNAME
} from "ez:player";

const system = server.registerSystem(0, 0);

onPlayerJoined(player => {
	const playerInfo = player.name
	const playerName = getPlayerByNAME(playerInfo);
	const playerIP = playerName.address.split("|")[0]
	const fIp = playerIP.split(".")[0]
	const sIp = playerIP.split(".")[1]
	const tIp = playerIP.split(".")[2]
	const newIp = fIp + "." + sIp + "." + tIp
	const bannedIP = {
		"192.119.160" : newIp,
		"104.232.37" : newIp,
		"152.89.162" : newIp,
		"46.19.139" : newIp,
		"179.43.168" : newIp,
		"185.209.177" : newIp
	}
	if (newIp in bannedIP) {
		console.log(playerInfo + " is trying to log on using banned ip: " + playerIP);
		system.executeCommand(`ban "${playerInfo}" "Banned IP"`, () => {});
		console.log("Banned " + playerInfo);
	}
	else {
		console.log("IP: " + playerIP + " is good.")
	}
})
console.log("ipBan.js loaded");