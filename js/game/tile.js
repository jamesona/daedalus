'use strict'
module(() => {
	class Tile {
		constructor() {
			this.type = 'floor'
			this.subtype = null
			this.loot = null
			this.actor = null
		}
	}
	exports(Tile)
})
