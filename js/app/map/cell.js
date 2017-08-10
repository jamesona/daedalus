'use strict'
document.head.innerHTML += `<link rel="stylesheet" href="css/cell.css" />`
module('app/element', (Element) => {
	class Cell {
		constructor() {
			this.element = new Element('td.cell')
			this.type = null
		}

		get type() {
			return this.element.dataset.type
		}

		set type(type) {
			this.element.dataset.type = type
		}

		get subtype() {
			return this.element.dataset.subtype
		}

		set subtype(type) {
			this.element.dataset.subtype = type
		}

		get loot() {
			return this.element.dataset.loot
		}

		set loot(loot) {
			this.element.dataset.loot = loot
		}

		get actor() {
			return this.element.dataset.actor
		}

		set actor(actor) {
			this.element.dataset.actor = actor
		}
	}
	exports(Cell)
})
