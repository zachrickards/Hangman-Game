var pokedex = {
	1: {
		name: "Bulbasaur",
		front: "assets/gif/bulbasaur_front.gif",
		back: "assets/gif/bulbasaur_back.gif",
		move: "assets/gif/bulbasaur_move.gif",
		attack: "Vine Whip",
		level: "1"
	},
	2: {
		name: "Ivysaur",
		front: "assets/gif/ivysaur_front.gif",
		back: "assets/gif/ivysaur_back.gif",
		move: "assets/gif/ivysaur_move.gif",
		attack: "Poison Powder",
		level: "2"
	},
	3: {
		name: "Venusaur",
		front: "assets/gif/venusaur_front.gif",
		back: "assets/gif/venusaur_back.gif",
		attack: "Solar Beam",
		level: "3"
	},
	4: {
		name: "Charmander",
		front: "assets/gif/charmander_front.gif",
		back: "assets/gif/charmander_back.gif",
		move: "assets/gif/charmander_move.gif",
		attack: "Ember",
		level: "1"
	},
	5: {
		name: "Charmeleon",
		front: "assets/gif/charmeleon_front.gif",
		back: "assets/gif/charmeleon_back.gif",
		move: "assets/gif/charmeleon_move.gif",
		attack: "Flame Burst",
		level: "2"
	},
	6: {
		name: "Charizard",
		front: "assets/gif/charizard_front.gif",
		back: "assets/gif/charizard_back.gif",
		move: "assets/gif/charizard_move.gif",
		attack: "Fire Spin",
		level: "3"
	},
	7: {
		name: "Squirtle",
		front: "assets/gif/squirtle_front.gif",
		back: "assets/gif/squirtle_back.gif",
		move: "assets/gif/squirtle_move.gif",
		attack: "Water Gun",
		level: "1"
	},
	8: {
		name: "Wartortle",
		front: "assets/gif/wartortle_front.gif",
		back: "assets/gif/wartortle_back.gif",
		move: "assets/gif/wartortle_move.gif",
		attack: "Water Pulse",
		level: "2"
	},
	9: {
		name: "Blastoise",
		front: "assets/gif/blastoise_front.gif",
		back: "assets/gif/blastoise_back.gif",
		move: "assets/gif/blastoise_move.gif",
		attack: "Hydro Pump",
		level: "3"
	}
};

var computerPoke = {},
	computerHP = "",
	playerPoke = {},
	playerHP = "",
	pokeGuess = "";
	guessesLeft = 0,
	lettersGuessed = "";

startGame();

function randomPokemon (player) {
	var random = Math.floor(Math.random() * 8) + 1;

	if (player === "computer") {
		computerPoke = pokedex[random];
	} else if (player === "player" && computerPoke !== pokedex[random]) {
		playerPoke = pokedex[random];
	} else {
		randomPokemon("player");
	}
}

function startGame () {
	computerPoke = {};
	playerPoke = {};
	pokeGuess = "";

	randomPokemon("computer");
	randomPokemon("player");

	pokeGuess = playerPoke.name + "_" + playerPoke.attack;
	pokeGuess = pokeGuess.split("");

	$("#enemy").append("<img id='enemy-poke' src='" + computerPoke.front + "' alt='enemy-pokemon'/>");
	$("#player").append("<img id='player-poke' src='" + playerPoke.back + "' alt='player-pokemon'/>");

	computerHP = generateHP(computerPoke.name, computerPoke.attack, computerPoke.level);
	playerHP = generateHP(playerPoke.name, playerPoke.attack, playerPoke.level);

	for (var i = 0; i < pokeGuess.length; i++) {
		var spaceHolder = document.createElement("span");

		$("#attack-guess").append(spaceHolder);

		if (pokeGuess[i] !== "_" && pokeGuess[i] !== " ") {
			$(spaceHolder).attr("id", i);
			$(spaceHolder).text("_");
		} else if (pokeGuess[i] === " ") {
			$(spaceHolder).attr("id", "space");
			$(spaceHolder).text("&nbsp;");
		} else {
			$(spaceHolder).attr("id", "Used");
			$(spaceHolder).text("Used");
		}
	}
}

function generateHP (name, attack, level) {
	console.log(name, attack, level);

	if (attack.indexOf(' ') >= 0) {
		attack = attack.replace(/ /g, "");
	}

	var healthPoints = name + attack,
		healthPointsResults = [];
		
	healthPoints = healthPoints.split('');

	$.each(healthPoints, function (i, letter) {
		if($.inArray(letter, healthPointsResults) === -1) {
			healthPointsResults.push(letter);
		}
	});

	if (level === "1") {
		return Math.ceil((healthPointsResults.length * 5) / 5) * 5;
	} else if (level === "2") {
		return Math.ceil((healthPointsResults.length * 7) / 5) * 5;
	} else if (level === "3") {
		return healthPointsResults.length * 10;
	}
}

function lettersGuess (letter) {
	console.log(letter);

	if (lettersGuessed.indexOf(letter) === -1 && lettersGuessed === "") {
		console.log('if');
		lettersGuessed = letter;
	} else if (lettersGuessed.indexOf(letter) === -1) {
		console.log('else if');
		lettersGuessed = lettersGuessed + ", " + letter;
	}

	console.log(lettersGuessed);
	$("#letters-guessed").text(lettersGuessed);
}

document.onkeyup = function (event) {
	var keyCode = event.keyCode,
		key = event.key;

	if ((keyCode >= 65 && keyCode <= 90) || (keyCode >= 97 && keyCode <= 122)) {
		lettersGuess(key.toLowerCase());
		
		for (var i = 0; i < pokeGuess.length; i++) {
			if (key.toLowerCase() === pokeGuess[i].toLowerCase()) {
				$("#" + i).each(function () {
					$(this).text(pokeGuess[i]);
				});
			}
		}
	} else {
		alert("You must enter a letter! Please try again.");
	}
}

















































