import {
    executeCommand,
	registerCommand,
	registerOverride
} from "ez:command";

registerCommand("suicide", "Commit suicide.", 0);
registerOverride("suicide", [], function () {
	if (this.entity)
		this.entity.kill()
});

console.log("suicide.js loaded");