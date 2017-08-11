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
					this.applyData(event.target)
					break
			}
		}
		applyData(room) {
			this.rows.forEach((row, i) => {
				row.cells.forEach((cell, j) => {
					let data = room.tiles[i][j]
					Object.keys(data).forEach(key => {
						cell[key] = data[key]
						cell.element.dataset[key] = data[key]
					})
				})
			})
			if (room.actors.length) {
				room.actors.forEach(actor => {
					let row = actor.location[0]
					let cell = actor.location[1]
					this.rows[row].cells[cell].element.dataset.actor = actor.type
					this.rows[row].cells[cell].element.dataset.sprite = actor.sprite
				})
			}
		}
	}
	exports(Map)
})
