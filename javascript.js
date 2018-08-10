/*
PrismScript Alpha 0.1
*/

// Vars
var compileData = {
	main:'/summon falling_block ~ ~1 ~ ',
	first:'{Block:command_block,Time:1,TileEntityData:{Command:"_COMMAND_"},Passengers:',
	rest:'[{id:falling_block,Block:command_block,Time:1,TileEntityData:{Command:"_COMMAND_"},Passengers:',
	last:'[{id:falling_block,Block:redstone_block,Time:1}]}'
}
var commands;

// Function to parse the into commands
function parse() {
	commands = ["/gamerule commandBlockOutput false"];
	var text = document.getElementById('textarea').value.split("\n");

	// Parse
	for (var i = 0; i < text.length; i++) {
		if (text[i].startsWith("print ")) {
			// Tellraw the text
			commands.push('/tellraw @p {"text":"' + text[i].substring(6) + '"}');
		}
	}

	// Fix quotes
	for (var i = 0; i < commands.length; i++) {
		commands[i] = commands[i].replace(/"/g, '\\"');
	}

	// Now compile it
	compile();
}

// Function to parse the commands to ONE command
function compile() {

	// Add the uninstall command
	//commands.push('/setblock ~ ~-' + (commands.length + 1) + ' ~2 command_block {TileEntityData:{Command:\\"/say\\"}}');

	// Add the redstone block activators
	commands.push("/fill ~ ~-" + (commands.length) +" ~-1 ~ ~" + (commands.length - 3) +" ~-1 redstone_block");

	// Result variable
	var result = compileData.main;

	// Add the first command part
	result += compileData.first.replace("_COMMAND_", commands[0]);

	// Add the rest of the commands
	for (var i = 1; i < commands.length; i++) {
		result += compileData.rest.replace("_COMMAND_", commands[i]);
	}

	// Add the redstone block activators
	result += compileData.last;

	// Now, add the last of the brackets
	for (var i = 1; i < commands.length; i++) {
		result += "]}";
	}

	// Make the user copy the result
	var resultDiv = document.getElementById('result');
	resultDiv.style.display = "block";
	resultDiv.value = result;
	resultDiv.focus();
	resultDiv.select();
	document.execCommand("copy");
	resultDiv.style.display = "none";
}