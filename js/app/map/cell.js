'use strict'
document.head.innerHTML += `<link rel="stylesheet" href="css/cell.css" />`
module('app/element', (ElementFromSelector) => {
	class Cell {
		constructor() {
			this.element = new ElementFromSelector('td.cell')
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
	}
	exports(Cell)
})
