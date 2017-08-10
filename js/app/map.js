'use strict'
document.head.innerHTML += `<link rel="stylesheet" href="css/map.css" />`
module('app/element', 'app/map/row', (Element, Row) => {
	class Map {
		constructor() {
			this.events = []
			this.element = new Element('table.map')
			this.rows = new Array(11).fill(null).map(row => new Row(this))
			this.rows.forEach(row => this.element.appendChild(row.element))
		}
		handleEvent(event) {
			switch(event.text) {
				case 'load room':
					this.applyData(event.target.tiles)
					break
			}
		}
		applyData(tiles) {
			this.rows.forEach((row, i) => {
				row.cells.forEach((cell, j) => {
					let data = tiles[i][j]
					Object.keys(data).forEach(key => {
						cell[key] = data[key]
					})
				})
			})
		}
	}
	exports(Map)
})
