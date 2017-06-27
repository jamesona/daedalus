class Game {
	constructor() {
		document.body.innerHTML = ''
		this.tileMap =
	}

	clearBody() {
		let childCount = document.body.children.length
		for (let i=0; i < childCount; i++) {
			const child = document.body.children[i]
			document.body.removeChild(child)
		}
	}
}

class MapCell {
	constructor() {
		this = new Array(5).fill(null).map(cell => new Array(5).fill(null))
	}
}
