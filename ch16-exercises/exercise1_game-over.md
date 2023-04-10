# Game Over

## Instructions

It’s traditional for platform games to have the player start with a limited
number of lives and subtract one life each time they die. When the player is out
of lives, the game restarts from the beginning.

Adjust runGame to implement lives. Have the player start with three. Output the
current number of lives (using console.log) every time a level starts.

## Student Work

Added two class variables to the State class:

	var State = class State {
		static DEFAULT_LIVES_NUMBER = 3;
		static playerLivesRemaining = this.DEFAULT_LIVES_NUMBER;

		// rest of class, etc.

Added an enclosing while loop to the main loop runGame(), and an else clause to
the status == "won" conditional:

	async function runGame(plans, Display) {
		let playerHasWon = false;
		while (!playerHasWon) {
			for (let level = 0; level < plans.length;) {
				let lifeNoun = State.playerLivesRemaining === 1 ? "life" : "lives";
				console.log(`${State.playerLivesRemaining} ${lifeNoun} left`);
				let status = await runLevel(new Level(plans[level]),
																		Display);
				if (status == "won") {
					level++;
					playerHasWon = level === plans.length;
				} else {
					State.playerLivesRemaining--;
					if (State.playerLivesRemaining === 0) {
						State.playerLivesRemaining = State.DEFAULT_LIVES_NUMBER;
						break;
					}
				}
			}
			if (!playerHasWon) console.log("Game over!");
		}
	  console.log("You've won!");
	}

The outer loop repeats the inner loop until playerHasWon is true; The inner loop
has new logic that handles the cases of player completing the level or not doing
so.
