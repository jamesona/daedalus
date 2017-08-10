'use strict'
document.head.innerHTML += `<link rel="stylesheet" href="css/row.css" />`
module('app/element', 'app/map/cell', (ElementFromSelector, Cell) => {
	class Row {
		constructor() {
			this.element = new ElementFromSelector('tr.row')
			this.cells = new Array(11).fill(null).map(cell => new Cell(this))
			this.cells.forEach(cell => this.element.appendChild(cell.element))
		}
	}
	exports(Row)
})
