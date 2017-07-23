'use strict'

class EventEmitter {
	constructor(after) {
		this.events = {}
		this.after = after
	}

	on(event, listener) {
		if (typeof this.events[event] !== 'object') {
	        this.events[event] = []
	    }

    	this.events[event].push(listener)
	}

	removeListener(event, listener) {
	    let index

	    if (typeof this.events[event] === 'object') {
	        index = this.events[event].indexOf(listener)

	        if (index > -1) {
	            this.events[event].splice(index, 1)
	        }
	    }
	}

	emit(event) {
	    let i
		let listeners
		let length
		let args = [].slice.call(arguments, 1)

	    if (typeof this.events[event] === 'object') {
	        listeners = this.events[event].slice()
	        length = listeners.length

	        for (i = 0; i < length; i++) {
	            listeners[i].apply(this, args)
	        }
	    }
		if (typeof this.after === 'function') this.after()
	}

	once(event, listener) {
		let f = function() {
	        this.removeListener(event, f)
	        listener.apply(this, arguments)
	    }
	    this.on(event, f)
	}
}
