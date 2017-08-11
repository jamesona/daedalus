'use strict';
module('game/world', 'game/player', (World, Player) => {
	class Game {
		constructor(options) {
			this.world = new World({
				roomSize: options.roomSize || null
			})
			this.actors = [new Player()]
			this.player = this.actors[0]
			debugger
		}
	}

	exports(Game)
})
