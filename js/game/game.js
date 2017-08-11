'use strict';
module('game/world', 'game/player', (World, Player) => {
	class Game {
		constructor(options) {
			this.world = new World({
				roomSize: options.roomSize || null
			})
			this.player = new Player()
		}
	}

	exports(Game)
})
