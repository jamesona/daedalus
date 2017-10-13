'use strict'
document.head.innerHTML += `<link rel="stylesheet" href="css/map.css" />`
module('app/element', 'app/map/row', (Element, Row) => {
	let events = []
	class Map {
		constructor() {
			this.element = new Element('table.map', {
				onclick: this.emitClick
			})
			this.rows = new Array(11).fill(null).map(row => new Row(this))
			this.rows.forEach(row => this.element.appendChild(row.element))
			this.data = null
		}
		get player() {
			if (this.data)
			return this.data.actors.find(actor => actor.type == 'player')
		}
		get events() {
			return events
		}
		handleEvent(event) {
			switch(event.type) {
				case 'load room':
					this.applyData(event.data)
					break
				case 'cell click':
					this.handleClick(event.data)
					break
				case 'move actor':
					this.moveActor(event.data.actor, event.data.location)
					break
			}
		}
		emitClick(evt) {
			let cell = evt.target
			events.push({type: 'cell click', data: cell})
		}
		handleClick(cell) {
			let data = cell.dataset
			if (data.type !== 'wall' && data.actor !== 'player')
				events.push({type: 'move actor', data: {
					actor: this.player,
					location: [data.x, data.y]
				}})
		}
		moveActor(actor, targetLocation) {
			// cast coords as ints first
			++targetLocation[0];targetLocation[0]--;++targetLocation[1];targetLocation[1]--
			++actor.location[0];actor.location[0]--;++actor.location[1];actor.location[1]--
			if (targetLocation[0] > actor.location[0]) ++actor.location[0]
			if (targetLocation[0] < actor.location[0]) --actor.location[0]
			if (targetLocation[1] > actor.location[1]) ++actor.location[1]
			if (targetLocation[1] < actor.location[1]) --actor.location[1]
			this.applyData(this.data)
			if (targetLocation[0] !== actor.location[0] || targetLocation[1] !== actor.location[1])
				events.push({
					type: 'move actor', data: {
						actor: actor,
						location: targetLocation
					}
				})
		}
		applyData(room) {
			this.data = room
			this.rows.forEach((row, i) => {
				row.cells.forEach((cell, j) => {
					let data = room.tiles[i][j]
					cell.element.dataset['y'] = i
					cell.element.dataset['x'] = j
					Object.keys(data).forEach(key => {
						cell[key] = data[key]
						cell.element.dataset[key] = data[key]
					})
				})
			})
			if (room.actors.length) {
				room.actors.forEach(actor => {
					let row = actor.location[1]
					let cell = actor.location[0]
					this.rows[row].cells[cell].element.dataset.actor = actor.type
					this.rows[row].cells[cell].element.dataset.sprite = actor.sprite
				})
			}
		}
	}
	exports(Map)
})
