'use strict'

class GameModel extends Model {
	constructor() {
		super({
			after: () => {
				setTimeout(() => {
					this.emit('tick', this)
				}, 100)
			},
			async: false
		})
		this.once('setup', (args, cb) => {
			this.map = new MapModel(this)
			this.map.once('initComplete', cb)
			this.map.init()
		})
		//  this.player = new Player(this)
		this.emit('tick', this)
	}
}
