/** Written by Jameson Aranda, 8/9/17
*	module accepts a list of file names to import, and returns a Promise
*	that completes when all parameters have been loaded.
*	If the final parameter is a function, it will be called with the loaded
*	parameters, in their original order.
**/
module = (function() {
	let moduleCache = {}
 	let module = function() {
		if (!window._moduleCache) window._moduleCache = {}
		let callback
		let dependencies = []
		let count = arguments.length - 1
		let last = arguments[count]
		if (typeof last === 'function')	callback = last
		if (count === 0) callback()
		return new Promise((resolveAll, rejectAll) => {
			for (let i=0; i < count; i++) new Promise((resolve, reject) => {
				let name = arguments[i]
				if (moduleCache[name]) return resolve(moduleCache[name])

				let fileName = '/' + name + '.js'
				fetch(fileName).then(response => {
					if (response.ok) return response.text().then(text => {
						let code = new Function('exports', text)
						code(resolve)
					})
					throw new Error('could not resolve ' + fileName)
				})
			}).then(dep => {
				dependencies.push(dep)
				if (dependencies.length === count) callback ?
				callback.apply(undefined, dependencies) :
				resolveAll.apply(undefined, dependencies)
			})
		})
	}
	return module
})()
