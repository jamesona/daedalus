'use strict';
module('game/world', (World) => {
	let world

	class Game {
		constructor(options) {
			world = new World({
				roomSize: options.roomSize || null
			})
		}

		get world() {
			return world
		}
	}

	exports(Game)
})
