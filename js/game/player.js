'use strict'
module('game/creature', (Creature) => {
	class Player extends Creature {
		constructor() {
			super({
				con: 10,
				str: 5,
				int: 5,
				dex: 5,
				location: [5,5],
				type: 'player'
			})
		}
	}
	exports(Player)
})
