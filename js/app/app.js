'use strict'
document.head.innerHTML += `<link rel="stylesheet" href="css/app.css" />`
module('game/game', 'app/menu', 'app/map', 'app/audio', (Game, Menu, Map, AudioController) => {
	let game
	class App {
		constructor() {
			this.element = document.createElement('app')
			document.body.appendChild(this.element)

			this.components = {
				menu: new Menu(),
				map: new Map(),
				audio: new AudioController()
			}

			Object.keys(this.components).forEach(key => {
				if (this.components[key].element)
					this.element.appendChild(this.components[key].element)
			})

			setInterval(this.tick.bind(this, this), 100)
			document.onkeyup = this.handleKey.bind(this)
			console.log(game)
		}

		get componentsArray() {
			return Object.keys(this.components).map(key => this.components[key])
		}

		tick(app) {
			this.componentsArray.forEach(component => {
				while (component.events.length) {
					this.handleEvent(component.events.pop())
				}
			})
		}

		handleEvent(event) {
			switch(event.type) {
				case 'new game':
					game = new Game({})
					let room = game.world.rooms[0][0]
					room.actors.push(game.player)
					this.components.map.handleEvent({
						type: 'load room',
						data: room
					})
					break
				case 'save game':
					this.saveGame()
					break
				case 'load game':
					this.loadGame()
					break
				case 'import save':
					let data = prompt('Paste save data:')
					if (data) this.loadGame(atob(data))
					break
			}
			this.componentsArray.forEach(component => component.handleEvent(event))
		}

		handleKey(evt) {
			switch(evt.key) {
				case 'Escape':
					if (game) this.components.menu.handleEvent({
						type: 'open menu'
					})
					break
			}
		}

		saveGame() {
			localStorage.setItem('daedalus-save', JSON.stringify(game))
		}

		loadGame(data) {
			if (!data) data = localStorage.getItem('daedalus-save')
			game = JSON.parse(data)
			this.components.map.handleEvent({
				type: 'load room',
				data: game.world.rooms[0][0]
			})
			this.components.menu.handleEvent({
				type: 'new game'
			})
		}
	}
	exports(App)
})
