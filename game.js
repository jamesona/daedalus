'use strict';
module('world', (World) => {
	class Game {
		constructor() {
			this.world = new World()
		}
	}

	exports(Game)
})
