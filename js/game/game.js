'use strict';
module('game/world', (World) => {
	class Game {
		constructor(options) {
			this.world = new World({
				roomSize: options.roomSize || null
			})
		}
	}

	exports(Game)
})
