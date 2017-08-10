'use strict'
document.head.innerHTML += `<link rel="stylesheet" href="css/map.css" />`
module('app/element', 'app/map/row', (ElementFromSelector, Row) => {
	class Map {
		constructor() {
			this.events = []
			this.element = new ElementFromSelector('table.map')
			this.rows = new Array(11).fill(null).map(row => new Row(this))
		}
		handleEvent() {
			
		}
	}
	exports(Map)
})
