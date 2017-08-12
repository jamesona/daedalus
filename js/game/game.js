'use strict'
module('game/world', 'game/player', (World, Player) => {
	const BESTIARY_URL = 'https://gist.githubusercontent.com/jamesona/e1a7cd804789e293c60ef6be2d540e46/raw/89a3bfc9b056baf23f06d3ae6f0bd8697a5c23ec/bestiary.json'
	const TREASURES_URL = 'https://gist.githubusercontent.com/jamesona/e1a7cd804789e293c60ef6be2d540e46/raw/89a3bfc9b056baf23f06d3ae6f0bd8697a5c23ec/treasures.json'
	let bestiary = {}
	let treasures = {}
	class Game {
		constructor(options) {
			this.world = new World({
				roomSize: options.roomSize || null
			})
			this.player = new Player()
		}

		get bestiary() {
			return bestiary
		}

		get treasures() {
			return treasures
		}
	}
	let importLibrary = function(url) {
		return new Promise((resolve, reject) => {
			let request = new XMLHttpRequest();
			request.open('GET', url)
			request.overrideMimeType('application/json')
			request.onreadystatechange = function() {
				if (request.readyState === XMLHttpRequest.DONE && request.status === 200)
					resolve(JSON.parse(request.responseText))
			}
			request.send()
		})
	}
	importLibrary(BESTIARY_URL).then((response) => {
		Object.keys(response).forEach(key => {
			bestiary[key] = response[key]
		})
	})
	importLibrary(TREASURES_URL).then((response) => {
		Object.keys(response).forEach(key => {
			treasures[key] = response[key]
		})
	})
	exports(Game)
})
