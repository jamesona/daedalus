Object.prototype.forEach = function(fn) {
	Object.keys(this).forEach( key => {
		fn(this[key])
	})
}
Object.prototype.toArray = function() {
	return Object.keys(this).map( key => this[key] )
}

class Element {
	clear() {
		let children = this.element.children
		for (let i=0; i < children.length; i++) {
			const child = children[i]
			this.element.removeChild(child)
		}
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

class Game extends Element {
	constructor() {
		super()
		this.element = document.body
		this.header = new Header()
		this.main = new Main()
		this.footer = new Footer()
		this.children = [
			this.header,
			this.main,
			this.footer
		]
	}
}

class Header extends Element {
	constructor() {
		super()
		this.element = document.createElement('header')
	}
}

class Main extends Element {
	constructor() {
		super()
		this.element = document.createElement('main')
		this.leftBar = new Sidebar()
		this.map = new Map()
		this.rightBar = new Sidebar()
		this.children = [
			this.leftBar,
			this.map,
			this.rightBar
		]
	}
}

class Sidebar extends Element {
	constructor() {
		super()
		this.element = document.createElement('aside')
	}
}

class Map extends Element {
	constructor() {
		super()
		this.element = document.createElement('table')
		this.children = [
			new MapRow(),
			new MapRow(),
			new MapRow(),
			new MapRow(),
			new MapRow()
		]
	}
}

class MapRow extends Element {
	constructor() {
		super()
		this.element = document.createElement('tr')
		this.children = [
			new MapCell(),
			new MapCell(),
			new MapCell(),
			new MapCell(),
			new MapCell()
		]
	}
}

class MapCell extends Element {
	constructor() {
		super()
		this.element = document.createElement('td')
	}
}

class Footer extends Element {
	constructor() {
		super()
		this.element = document.createElement('footer')
	}
}
