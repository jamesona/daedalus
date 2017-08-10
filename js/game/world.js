'use strict';
module('game/room', (Room) => {
	let world = {}
	class World {
		constructor(options) {
			this.roomSize = options.roomSize || 11
			world[0] = {}
			world[0][0] = new Room(this, [0,0])
		}

		get rooms() {
			return world
		}

		getRoom(x, y) {
			if (!world[x] || !world[x][y])
				this.addRoom(x, y)
			return world[x][y]
		}

		addRoom(x, y) {
			if (!world[x]) world[x] = {}
			world[x][y] = new Room(this, [x,y])
		}
	}

	exports(World)
})
