'use strict'
module('game/tile', (Tile) => {
	let directions = ['north','east','south','west']
	class Room {
		constructor(world, location) {
			this.world = world
			this.location = {
				x: location[0],
				y: location[1]
			}
			this.tiles = new Array(world.roomSize).fill(null)
				.map(row => {
					return new Array(world.roomSize).fill(null)
						.map(tile => new Tile())
				})
			setWalls(this)
			generateDoors(this)
		}
		get north() {
			let rooms = this.world.rooms
			let wall = getRow(this.tiles, 0)
			let adjPos = {x: this.location.x, y: this.location.y + 1}
			let neighbor = (rooms[adjPos.x] && rooms[adjPos.x][adjPos.y]) ?
				this.world.rooms[adjPos.x][adjPos.y] : null

			return {
				tiles: wall,
				door: hasDoor(wall),
				neighbor: neighbor
			}
		}
		get east() {
			let rooms = this.world.rooms
			let wall = getCol(this.tiles, this.tiles.length - 1)
			let adjPos = {x: this.location.x + 1, y: this.location.y}
			let neighbor = (rooms[adjPos.x] && rooms[adjPos.x][adjPos.y]) ?
				this.world.rooms[adjPos.x][adjPos.y] : null

			return {
				tiles: wall,
				door: hasDoor(wall),
				neighbor: neighbor
			}
		}
		get south() {
			let rooms = this.world.rooms
			let wall = getRow(this.tiles, this.tiles.length - 1)
			let adjPos = {x: this.location.x, y: this.location.y - 1}
			let neighbor = (rooms[adjPos.x] && rooms[adjPos.x][adjPos.y]) ?
				this.world.rooms[adjPos.x][adjPos.y] : null

			return {
				tiles: wall,
				door: hasDoor(wall),
				neighbor: neighbor
			}
		}
		get west() {
			let rooms = this.world.rooms
			let wall = getCol(this.tiles, 0)
			let adjPos = {x: this.location.x - 1, y: this.location.y}
			let neighbor = (rooms[adjPos.x] && rooms[adjPos.x][adjPos.y]) ?
				this.world.rooms[adjPos.x][adjPos.y] : null

			return {
				tiles: wall,
				door: hasDoor(wall),
				neighbor: neighbor
			}
		}
	}
	let getRow = function(source, n) {
		if (source[n])
			return source[n]
		return null
	}

	let getCol = function(source, n) {
		if (source[0][n])
			return source.map(row => row[n])
		return null
	}
	let hasDoor = function(wall) {
		let midpoint = getMidpoint(wall.length)
		return wall[midpoint].type === 'door'
	}
	let setWalls = function(room) {
		let first = 0
		directions.forEach(direction => {
			let wall = room[direction]
			let last = wall.tiles.length - 1
			wall.tiles.forEach((tile, i) => {
				tile.type = 'wall'
				if (direction === 'west') {
					if (i === first)
						tile.subtype = 'top-left'
					else if (i === last)
						tile.subtype = 'bottom-left'
					else
						tile.subtype = 'left'
				}
				if (direction === 'east') {
					if (i === first)
						tile.subtype = 'top-right'
					else if (i === last)
						tile.subtype = 'bottom-right'
					else
						tile.subtype = 'right'
				}
			})
		})
	}
	let generateDoors = function(room) {
		let doorCount = 0
		let undefinedRooms = []
		directions.forEach(direction => {
			let wall = room[direction]
			if (wall.neighbor) {
				addDoor(wall.tiles, direction)
				doorCount++
			} else {
				undefinedRooms.push(direction)
			}
		})
		while (undefinedRooms.length) {
			let random = getRandomInt(0, undefinedRooms.length - 1)
			let direction = undefinedRooms.splice(random, 1)
			if (Math.random() * (4 - doorCount) > 1 || doorCount === 0) {
				let wall = room[direction]
				addDoor(wall.tiles, direction)
				doorCount++
			}
		}
	}
	let addDoor = function(wall, direction) {
		let midpoint = getMidpoint(wall.length)
		wall[midpoint].type = 'door'
		switch(direction) {
			case 'north':
				wall[midpoint - 1].subtype = 'top'
				wall[midpoint + 1].subtype = 'top'
				break
			case 'south':
				wall[midpoint - 1].subtype = 'bottom'
				wall[midpoint + 1].subtype = 'bottom'
				break
		}
		wall[midpoint - 1].subtype += '-door-1'
		wall[midpoint + 1].subtype += '-door-2'
	}
	let getRandomInt = function(min, max) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}

	let getMidpoint = function(n) {
		return Math.floor(n / 2)
	}
	exports(Room)
})
