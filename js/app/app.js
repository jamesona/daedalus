'use strict';
document.head.innerHTML += `<link rel="stylesheet" href="css/app.css" />`
module('game/game', 'app/menu', 'app/map', (Game, Menu, GameMap) => {
	let game
	class App {
		constructor() {
			this.element = document.createElement('app')
			document.body.appendChild(this.element)

			this.components = {
				menu: new Menu(),
				map: new GameMap()
			}

			Object.keys(this.components).forEach(key => {
				this.element.appendChild(this.components[key].element)
			})

			setInterval(this.tick.bind(this, this), 100)
			document.onkeyup = this.handleKey.bind(this)
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
			switch(event.text) {
				case 'new game':
					game = new Game({})
					this.components.map.handleEvent({
						text: 'load room',
						target: game.world.rooms[0][0]
					})
					break
				case 'save game':
					localStorage.setItem('daedalus-save', JSON.stringify(game))
					break
				case 'load game':
					this.loadGame(localStorage.getItem('daedalus-save'))
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
						text: 'open menu'
					})
					break
			}
		}

		loadGame(data) {
			game = JSON.parse(data)
			this.components.map.handleEvent({
				text: 'load room',
				target: game.world.rooms[0][0]
			})
			this.components.menu.handleEvent({
				text: 'new game'
			})
		}
	}
	exports(App)
})
