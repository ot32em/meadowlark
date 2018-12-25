let dice = [1,2,3,4,5,6]

exports.rollDice = function() {    	
	let index = Math.floor(Math.random() * dice.length);
    return dice[index];
}