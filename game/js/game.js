'use strict'

function getRandomInt(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getMidpoint(n) {
	return Math.floor(n / 2)
}

class GameComponent {
	constructor(game) {
		if (game) this.game = game
	}
}

class GameElement extends GameComponent {
	constructor(config) {
		super(config.game)
		this.children = []

		let selector = new Selector(config.selector)
		let element
		if (config.selector === 'body')
			element = document.body
		else
			element = document.createElement(selector.tag)
		Object.defineProperty(this, 'element', {
			get: () => {
				return element
			}
		})
		Object.defineProperty(element, 'model', {
			get: () => {
				return this
			}
		})

		if (selector.id) element.id = selector.id
		if (selector.classList) selector.classList.forEach( className => {
			element.classList.add(className)
		})
	}
	clear() {
		let children = this.element.children
		for (let i=0; i < children.length; i++) {
			const child = children[i]
			this.element.removeChild(child)
		}
	}
	addChild(child) {
		this.children.push(child)
		child.parent = this
		return child
	}
	removeChild(child) {
		delete child.parent
		let index = this.children.indexOf(child)
		this.children.splice(index, 1)
	}
	appendElement(element) {
		this.element.appendChild(element)
	}
	appendChildren(all) {
		if (this.children)
			this.children.forEach( child => {
				this.element.appendChild( child.element )
				if (all) child.appendChildren(true)
			})
	}
	applyData(data) {
		Object.keys(data).forEach(key => {
			if (data.hasOwnProperty(key))
				this.element.setAttribute('data-' + key, data[key])
		})
	}
}

class Selector {
	constructor(selector) {
		Object.defineProperty(this, 'tag', {
			get: function() {
				return selector.split(/[#.]/)[0]
			}
		})
		Object.defineProperty(this, 'id', {
			get: function() {
				return selector.split('#')[1] || null
			}
		})
		Object.defineProperty(this, 'classList', {
			get: function() {
				return selector.split('.').slice(1) || null
			}
		})
	}
}

class Game extends GameElement {
	constructor(roomSize) {
		super({selector: 'body'})
		this.roomSize = (roomSize) ? roomSize : 11
		this.position = {x: 0, y: 0}
		this.header = this.addChild( new Header(this) )
		this.main = this.addChild( new Main(this) )
		this.footer = this.addChild( new Footer(this) )
		this.player = new Player(this)
		this.appendChildren(true)

		// this will be called dynamically by the event stack
		this.tick()
	}

	tick() {
		this.map.tick()
	}
}

class Header extends GameElement {
	constructor(game) {
		super({selector: 'header', game: game})
	}
}

class Main extends GameElement {
	constructor(game) {
		super({selector: 'main', game: game})
		game.leftBar = this.addChild( new LeftSidebar(game) )
		game.view = this.addChild( new View(game) )
		game.rightBar = this.addChild( new RightSidebar(game) )
	}
}

class LeftSidebar extends GameElement {
	constructor(game) {
		super({selector: 'aside.sidebar.left', game: game})
	}
}

class RightSidebar extends GameElement {
	constructor(game) {
		super({selector: 'aside.sidebar.right', game: game})
	}
}

class View extends GameElement {
	constructor(game) {
		super({selector: 'div.map-wrapper', game: game})
		game.map = this.addChild( new Map(game) )
	}
}

class Map extends GameElement {
	constructor(game) {
		super({selector: 'table.map', game: game})
		this.data = {}
		for (let i = 0; i < this.game.roomSize; ++i) {
			this.addChild( new MapRow(game) )
		}
		this.addRoom(game.position)
		this.drawRoom(this.loadRoom(game.position))
	}

	addRoom(pos) {
		if (typeof this.data[pos.y] === 'undefined')
			this.data[pos.y] = {}
		this.data[pos.y][pos.x] = new Room(this.game, pos)
	}

	loadRoom(pos) {
		let room
		try {
			room = this.data[pos.y][pos.x]
		} catch(e) {
			return null
		}
		return room
	}

	drawRoom(room) {
		let rows = this.children
		rows.forEach((row, i) => {
			let tiles = row.children
			tiles.forEach((tile, j) => {
				tile.applyData(room.tiles[i][j])
			})
		})
	}

	tick() {
		let room = this.loadRoom(this.game.position)
		let player = this.game.player
		let playerPos = player.position
		if (playerPos.x === null) {
			playerPos.x = playerPos.y = getMidpoint(this.game.roomSize)
		} else {
			player.element.parentNode.removeChild(player.element)
		}
		let playerCell = this.children[playerPos.y].children[playerPos.x]
		playerCell.element.appendChild(player.element)
	}
}

class MapRow extends GameElement {
	constructor(game) {
		super({selector: 'tr.row', game: game})
		for (let i = 0; i < this.game.roomSize; ++i) {
			this.addChild( new MapTile(this.game) )
		}
	}
}

class MapTile extends GameElement {
	constructor(game) {
		super({selector: 'td.tile', game: game})
	}
}

class Footer extends GameElement {
	constructor(game) {
		super({selector: 'footer', game: game})
	}
}

class Room extends GameComponent {
	constructor(game, location) {
		super(game)
		this.location = location
		this.mobiles = []
		let size = game.roomSize
		this.tiles = new Array(size).fill(null).map(row => {
			return new Array(size).fill(null).map(tile => new Tile())
		})

		this.generate()
	}

	getRow(n) {
		if (this.tiles[n])
			return this.tiles[n]
		return null
	}

	getCol(n) {
		if (this.tiles[0][n])
			return this.tiles.map(row => row[n])
		return null
	}

	generate() {
		this.setWalls()
		this.addDoors()
	}

	setWalls() {
		let first = 0
		let last = this.game.roomSize - 1
		for (let row = first; row <= last; ++row) {
			for (let column = first; column <= last; ++column) {
				let tile = this.tiles[row][column]
				if (row == first || row == last || column == first || column == last) {
					tile.type = 'wall'
					if (row == first || row == last) {
						if (row == first) {
							tile.subtype = (Math.round(Math.random())) ? 0 : getRandomInt(1,6)
							if (column == first) tile.subtype = 'top-left'
							if (column == last) tile.subtype = 'top-right'
						}
						if (row == last) {
							tile.subtype = (Math.round(Math.random())) ? 0 : getRandomInt(1,6)
							if (column == first) tile.subtype = 'bottom-left'
							if (column == last) tile.subtype = 'bottom-right'
						}
					} else {
						if (column == first) tile.subtype = 'left'
						if (column == last) tile.subtype = 'right'
					}
				}
			}
		}
		this.walls = {
			north: this.getRow(first),
			east: this.getCol(last),
			south: this.getRow(last),
			west: this.getCol(first)
		}
	}

	addDoors() {
		let neighbors = this.getAdjacentDoors()
		let directions = Object.keys(neighbors)
		let doorCount = 0
		let random = () => {
			// this translates pretty closely to a 25% chance reduction per existing door
			// just with a lot with more variance on a case-by-case basis
			return !!Math.floor(Math.round(Math.random() * 100) / (23 * doorCount))
		}
		directions.forEach((direction, i, doors) => {
			if (neighbors[direction] === true) {
				++doorCount
				setDoor(direction)
			}
		})
		directions.forEach(direction => {
			if (neighbors[direction] === null && random()) {
				this.setDoor(direction)
				++doorCount
			}
		})
	}

	getAdjacentDoors() {
		let doors = {}
		let x = this.location.x
		let y = this.location.y
		let directions = ['north', 'east', 'south', 'west']

		directions.forEach(direction => {
			doors[direction] = null
			if (this.game.map) {
				let opposite
				let adjacent
				switch (direction) {
					case 'north':
					adjacent = this.game.map.loadRoom({x: x, y: y + 1})
					opposite = 'south'
					break

					case 'east':
					adjacent = this.game.map.loadRoom({x: x + 1, y: y})
					opposite = 'west'
					break

					case 'south':
					adjacent = this.game.map.loadRoom({x: x, y: y - 1})
					opposite = 'north'
					break

					case 'west':
					adjacent = this.game.map.loadRoom({x: x - 1, y: y})
					opposite = 'east'
					break
				}
				doors[direction] = adjacent[direction].hasDoor(opposite)
			}

		})
		return doors
	}

	hasDoor(direction) {
		let wall = this.walls[direction]
		let midpoint = getMidpoint(this.game.roomSize)
		return wall[midpoint].type == 'door'
	}

	setDoor(direction) {
		let wall = this.walls[direction]
		let midpoint = getMidpoint(this.game.roomSize)
		wall[midpoint].type = 'door'
		if (direction == 'south') {
			wall[midpoint - 1].subtype = 'bottom'
			wall[midpoint + 1].subtype = 'bottom'
		}
		wall[midpoint - 1].subtype += '-door-1'
		wall[midpoint + 1].subtype += '-door-2'
	}
}

class Tile extends GameComponent {
	constructor(game) {
		super(game)
		this.type = 'floor'
	}
}

class Mobile extends GameElement {
	constructor(game) {
		super({
			selector: 'div.mobile',
			game: game
		})
		this.stats = {
			str: 5,
			int: 5,
			dex: 5,
			per: 5,
			sta: 5,
			att: 5,
			hp: 5
		}
		this.inventory = []
		this.position = {
			x: null,
			y: null,
		}
	}
}

class Player extends Mobile {
	constructor(game) {
		super(game)
		this.element.classList.add('player')
		this.sprite = 0
		this.applyData(this)
	}
}
