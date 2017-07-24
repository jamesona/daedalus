'use strict'

class MapModel extends Model {
	constructor(game) {
		super(game)
		let currentLocation
		let pendingLocation
		Object.defineProperty(this, 'location', {
			get: () => currentLocation
		})
		this.rooms = {}
	}

	set location(loc) {
		this.once('locationChanged', (args, cb) => {

		})
		this.emit('locationChanged', this.location, loc)
	}

	init() {

	}

	createRoom(pos) {
		let room = new Room({
			callback: () => {this.emit('roomCreated')}
		})
	}

	getNeighbors(pos) {
		return {
			north: this.rooms[pos.y + 1][pos.x],
			east: this.rooms[pos.y][pos.x + 1],
			south: this.rooms[pos.y - 1][pos.x],
			west: this.rooms[pos.y][pos.x - 1]
		}
	}
}

class Room {
	constructor() {
		this.tiles = new Array(11).fill(null)
			.map(row => new Array(11).fill(null)
				.map(cell => new Tile())
			)
	}
}

class Tile {
	constructor() {

	}
}
