'use strict';
require('world', (World) => {
	class Game {
		constructor() {
			this.world = new World()
		}
	}

	exports(Game)
})
