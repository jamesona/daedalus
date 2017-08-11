'use strict';
module('game/room', (Room) => {
	class World {
		constructor(options) {
			this.rooms = {}
			this.roomSize = options.roomSize || 11
			this.rooms[0] = {}
			this.rooms[0][0] = new Room(this, [0,0])
		}

		getRoom(x, y) {
			if (!this.rooms[x] || !this.rooms[x][y])
				this.addRoom(x, y)
			return this.rooms[x][y]
		}

		addRoom(x, y) {
			if (!this.rooms[x]) this.rooms[x] = {}
			this.rooms[x][y] = new Room(this, [x,y])
		}
	}

	exports(World)
})
