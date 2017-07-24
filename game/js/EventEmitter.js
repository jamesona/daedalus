'use strict'

class EventEmitter {
	constructor(options) {
		let nullFn = () => {}
		this.events = {}
		this.after = options.after || nullFn
		this.async = options.async || true
	}

	on(event, listener, index) {
		if (typeof this.events[event] !== 'object') {
	        this.events[event] = []
	    }
		if (index)
			this.events[event].splice(index, 0, listener)
		else
    		this.events[event].push(listener)
	}

	removeListener(event, listener) {
	    if (typeof this.events[event] === 'object') {
			let index = this.events[event].indexOf(listener)

	        if (index > -1) {
	            this.events[event].splice(index, 1)
	        }
	    }
	}

	emit(event) {
		let args = [].slice.call(arguments, 1)
		if (typeof this.events[event] === 'object') {
			let listeners = this.events[event].slice()

			if (!this.async)
				return this.cascade(args, listeners, this.after)

			for (let i = 0; i < listeners.length; i++) {
				listeners[i].apply(this, args)
			}
		}
		this.after()
	}

	once(event, listener, i) {
		let f = function() {
	        this.removeListener(event, f)
	        listener.apply(this, arguments)
	    }
	    this.on(event, f, i)
	}

	cascade(args, listeners, callback) {
		let listener = listeners.shift()
		if (listeners.length > 0)
			listener(args, () => { this.cascade(args, listeners, callback) })
		else
			listener(args, callback)
	}
}
