'use strict';
document.head.innerHTML += `<link rel="stylesheet" href="css/app.css" />`
module('game/game', 'app/menu', 'app/map', (Game, Menu, GameMap) => {
	let _model
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
					console.log('new game started')
					break
			}
			this.componentsArray.forEach(component => component.handleEvent(event))
		}
	}
	exports(App)
})
