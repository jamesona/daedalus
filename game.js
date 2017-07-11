'use strict'

Object.prototype.forEach = function(fn) {
	Object.keys(this).forEach( key => {
		fn(this[key])
	})
}
Object.prototype.toArray = function() {
	return Object.keys(this).map( key => this[key] )
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
			get: function() {
				return element
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
		this.appendChildren(true)
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
		if (typeof this.data[pos.x] === 'undefined')
			this.data[pos.y] = {}
		this.data[pos.y][pos.x] = new Room(this.game)
	}
	loadRoom(pos) {
		let room
		try {
			room = this.data[pos.y][pos.x]
		} catch(e) {
			console.log(e)
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
	applyData(data) {
		Object.keys(data).forEach(key => {
			if (data.hasOwnProperty(key))
				this.element.setAttribute('data-' + key, data[key])
		})
	}
}

class Footer extends GameElement {
	constructor(game) {
		super({selector: 'footer', game: game})
	}
}

class Room extends GameComponent {
	constructor(game) {
		super(game)
		this.tiles = new Array(this.game.roomSize).fill(null).map( column => {
			return new Array(this.game.roomSize).fill( new Tile(game) )
		})
	}
}

class Tile extends GameComponent {
	constructor(game) {
		super(game)
		this.type = 'floor'
	}
}
