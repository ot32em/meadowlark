let dice = [1,2,3,4,5,6];

function rollDice() {    	
	let index = Math.floor(Math.random() * dice.length);
    return dice[index];
}

exports.rollDice = rollDice;
