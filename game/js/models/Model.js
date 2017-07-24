'use strict'

let model = []

class Model extends EventEmitter {
	 constructor(config) {
		 super(config)
		 if (config.game) {
			 this.game = config.game
			 this.game.on('tick', () => {this.emit('tick')})
		 }
	 }

	 prop(startVal, canChange) {
 		if (typeof canChange !== 'function')
 			canChange = () => true
 		let id = model.length
 		model.push(startVal)
 		return (val) => {
 			if (val) {
 				let reason = canChange()
 				if (reason === true) {
 					model[id] = val
 					this.emit('modelUpdate', val, id)
 				} else {
 					this.emit('modelUpdatePrevented', val, reason, id)
 				}
 			} else {
 				return model[id]
 			}
 		}
 	}
}
