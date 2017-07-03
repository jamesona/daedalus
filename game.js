Object.prototype.forEach = function(fn) {
	Object.keys(this).forEach( key => {
		fn(this[key])
	})
}
Object.prototype.toArray = function() {
	return Object.keys(this).map( key => this[key] )
}

class Element {
	constructor(selector) {
		if (selector === 'body')
			this._ele = document.body
		else
			this._ele = document.createElement(selector)
	}
	get element() {
		return this._ele
	}
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
		super('body')
		this.header = new Header()
		this.main = new Main()
		this.footer = new Footer()
		this.children = [
			this.header,
			this.main,
			this.footer
		]
		this.appendChildren(true)
	}
}

class Header extends Element {
	constructor() {
		super('header')
	}
}

class Main extends Element {
	constructor() {
		super('main')
		this.leftBar = new Sidebar()
		this.view = new View()
		this.rightBar = new Sidebar()
		this.children = [
			this.leftBar,
			this.view,
			this.rightBar
		]
	}
}

class Sidebar extends Element {
	constructor() {
		super('aside')
	}
}

class View extends Element {
	constructor() {
		super('div')
		let clientHeight = document.documentElement.clientHeight
		let clientWidth = document.documentElement.clientWidth
		this.aspectRatio = (clientWidth * 0.8) / clientHeight
		this.children = [
			new Map()
		]
	}
	get aspectRatio() {
		return this.element.style.flexGrow
	}
	set aspectRatio(ratio) {
		this.element.style.flexGrow = ratio
	}
}

class Map extends Element {
	constructor() {
		super('table')
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
		super('tr')
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
		super('td')
	}
}

class Footer extends Element {
	constructor() {
		super('footer')
	}
}
