'use strict';
module('game/world', (World) => {
	let _world = new World()

	class Game {
		get world() {
			return _world
		}
	}

	exports(Game)
})
