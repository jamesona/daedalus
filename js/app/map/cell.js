'use strict'
document.head.innerHTML += `<link rel="stylesheet" href="css/cell.css" />`
module('app/element', (Element) => {
	class Cell {
		constructor() {
			this.element = new Element('td.cell')
			this.type = null
		}
	}
	exports(Cell)
})
