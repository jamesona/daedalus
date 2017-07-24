(() => {
	[
		'common',
		'EventEmitter',
		'Game',
		'Item',
		'Creature',
		'models/Model',
		'models/PlayerModel',
		'models/GameModel',
		'models/MapModel'
	].forEach(path => {
		let tag = document.createElement('script')
		tag.src = 'js/' + path + '.js'
		document.head.appendChild(tag)
	})

	// window.imports = {}
	// let loadEvent = new Event('DependencyLoaded')
	// window.define = function(path, dependencies, loader) {
	// 	let loadQueue = new Array(dependencies)
	// 	if (loadQueue.length) {
	// 		dependencies.forEach(dep => {
	// 			require(dep).then(res => {
	// 				imports[dep] = res
	// 				loadQueue.shift()
	// 				if (loadQueue.length === 0) {
	// 					loader.apply(this, dependencies.map(dep => imports[dep]))
	// 					dispatchEvent(new Event(path))
	// 				}
	// 			})
	// 		})
	// 	} else {
	// 		loader.apply(this, dependencies.map(dep => imports[dep]))
	// 		dispatchEvent(new Event(path))
	// 	}
	// }
	// window.require = function(path) {
	// 	if (imports[path]) return imports[path]
	// 	let tag = document.createElement('script')
	// 	tag.src = 'js/' + path + '.js'
	// 	document.head.appendChild(tag)
	// 	return new Promise((resolve, reject) => {
	// 		window.addEventListener(path, event => {
	// 			resolve(imports[path])
	// 		})
	// 	})
	// }
	//
	// require('Game').then(game => new Game())
})()
