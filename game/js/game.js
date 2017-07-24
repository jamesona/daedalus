'use strict'

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
		this.events = new EventEmitter(() => {
			setTimeout(() => {
				this.events.emit('tick')
			}, 100)
		})
		this.showLoadSplash()
		this.roomSize = (roomSize) ? roomSize : 11
		this.position = {x: 0, y: 0}
		this.header = this.addChild( new Header(this) )
		this.main = this.addChild( new Main(this) )
		this.footer = this.addChild( new Footer(this) )
		this.player = new Player(this)
		this.appendChildren(true)

		// this will be called dynamically by the event stack
		this.events.emit('tick')
	}

	showLoadSplash() {
		let splash = document.createElement('div')
		let hero = document.createElement('img')
		let text = document.createElement('h2')
		splash.classList.add('splash')
		hero.src = 'img/champion.gif'
		text.innerHTML = 'Loading...'
		splash.appendChild(hero)
		splash.appendChild(text)
		document.body.appendChild(splash)
		let heroPos = -15
		let incrementHero = () => {
			heroPos += 1
			hero.style.left = heroPos + 'vw'
			if (heroPos < 100)  setTimeout(() => {
				incrementHero()
			}, 100)
			else {
				splash.classList.add('hide')
				setTimeout(() => {
					splash.parentNode.removeChild(splash)
				}, 500)
			}
		}
		incrementHero()
	}
}

class Header extends GameElement {
	constructor(game) {
		super({selector: 'header', game: game})

		this.element.innerHTML = 'Click a tile to move.'
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

class Inventory extends GameElement {
	constructor(game) {
		super({selector: 'div.inventory', game: game})
	}

	load(source) {
		this.children.forEach(child => {
			this.removeChild(child)
		})
		for (let i = 0; i < source; i++) {
			let slot = new InventorySlot(game)
			slot.item = source[i]
			slot.count = slot.item.count
			this.addChild(slot)
			slot.applyData()
		}
	}
}

class InventorySlot extends GameElement {
	constructor(game) {
		super({selector: 'div.slot', game: game})
		this.item = null
		this.count = 0
	}
}

class LeftSidebar extends GameElement {
	constructor(game) {
		super({selector: 'aside.sidebar.left', game: game})
		this.addChild(new Inventory(game))
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
		this.game.events.on('tick', () => {
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
		})
	}

	addRoom(pos) {
		if (typeof this.data[pos.y] === 'undefined')
			this.data[pos.y] = {}
		let room = new Room(this.game, pos)
		this.data[pos.y][pos.x] = room
		return room
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
				tile.data = room.tiles[i][j]
			})
		})
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
		this.element.onclick = this.activate.bind(this)
	}

	activate() {
		let row = this.parent.parent.children.indexOf(this.parent)
		let column = this.parent.children.indexOf(this)
		switch (this.element.getAttribute('data-type')) {
			case 'wall':
				this.game.header.element.innerHTML = 'Can\'t move inside walls!'
				break;
			default:
				this.game.header.element.innerHTML = 'Moving to row ' + row + ', column ' + column
				this.game.player.move({y: row, x: column}, this)
		}
		this.game.events.once('playerMoveComplete', tile => {
			if (tile.data.type === 'door')
				this.game.position = tile.data.to
		})
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
		let cell = wall[midpoint]
		cell.type = 'door'
		switch (direction) {
			case 'north':
				wall[midpoint - 1].subtype = 'top'
				wall[midpoint + 1].subtype = 'top'
				cell.to = {x: this.location.x, y: this.location.y + 1}
				break;
			case 'east':
				cell.to = {x: this.location.x + 1, y: this.location.y}
				break;
			case 'south':
				wall[midpoint - 1].subtype = 'bottom'
				wall[midpoint + 1].subtype = 'bottom'
				cell.to = {x: this.location.x, y: this.location.y - 1}
				break;
			case 'west':
				cell.to = {x: this.location.x - 1, y: this.location.y}
				break;
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

	move(pos, tile) {
		let diff = () => {
			return {
				x: this.position.x - pos.x,
				y: this.position.y - pos.y
			}
		}
		if (Math.abs(diff().x) > Math.abs(diff().y)) {
			if (pos.x > this.position.x) {
				this.position.x++
				console.log('moved right')
			} else {
				this.position.x--
				console.log('moved left')
			}
		} else {
			if (pos.y > this.position.y) {
				this.position.y++
				console.log('moved down')
			} else {
				this.position.y--
				console.log('moved up')
			}
		}
		setTimeout(() => {
			if (this.position.x !== pos.x || this.position.y !== pos.y) this.move(pos, tile)
			else this.game.events.emit('playerMoveComplete', tile)
		}, 600)
	}
}
