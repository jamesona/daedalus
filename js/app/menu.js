'use strict'
document.head.innerHTML += `<link rel="stylesheet" href="css/menu.css" />`
module('app/element', ElementFromSelector => {
	let events = []
	class Menu {
		constructor() {
			this.element = new ElementFromSelector('menu-holder')
			this.menus = {
				main: new MainMenu(events),
				new: new NewMenu(events)
			}
			this.element.appendChild(this.menus.new.element)
		}
		get menuArray() {
			return Object.keys(this.menus).map(key => this.menus[key])
		}
		get events() {
			return events
		}
		handleEvent(event) {
			switch(event.text) {
				case 'new game':
					this.element.removeChild(this.menus.new.element)
					this.element.appendChild(this.menus.main.element)
					break
				case 'close menu':
					event.target.element.style.display = "none"
			}
		}
	}

	class MainMenu {
		constructor() {
			this.element = new ElementFromSelector('menu')
			this.element.innerHTML = `<h1>Daedalus</h1>`
			this.buttons = {
				new: new ElementFromSelector('button', {
					onclick: () => {
						events.push({text: 'new game', target: this})
					},
					innerHTML: 'New Game'
				}),
				save: new ElementFromSelector('button', {
					onclick: () => {
						events.push({text: 'save game', target: this})
					},
					innerHTML: 'Save'
				}),
				close: new ElementFromSelector('button', {
					onclick: () => {
						events.push({text: 'close menu', target: this})
					},
					innerHTML: 'Close'
				}),
				export: new ElementFromSelector('button', {
					onclick: () => {
						events.push({text: 'export save', target: this})
					},
					innerHTML: 'Export Save'
				}),
				about: new ElementFromSelector('a', {
					href: '/about.html',
					target: '_blank',
					innerHTML: 'About'
				})
			}
			Object.keys(this.buttons).forEach(key => {
				this.element.appendChild(this.buttons[key])
			})
		}
	}
	class NewMenu {
		constructor() {
			this.element = new ElementFromSelector('menu')
			this.element.innerHTML += `<h1>Daedalus</h1>`
			this.buttons = {
				new: new ElementFromSelector('button', {
					onclick: () => {
						events.push({text: 'new game', target: this})
					},
					innerHTML: 'New Game'
				}),
				continue: new ElementFromSelector('button', {
					onclick: () => {
						events.push({text: 'load game', target: this})
					},
					innerHTML: 'Continue Game',
					disabled: !localStorage.getItem('daedalus-save')
				}),
				import: new ElementFromSelector('button', {
					onclick: () => {
						events.push({text: 'import save', target: this})
					},
					innerHTML: 'Import Save'
				}),
				export: new ElementFromSelector('button', {
					onclick: () => {
						events.push({text: 'export save', target: this})
					},
					innerHTML: 'Export Save',
					disabled: !localStorage.getItem('daedalus-save')
				}),
				about: new ElementFromSelector('a', {
					href: '/about.html',
					target: '_blank',
					innerHTML: 'About'
				})
			}
			Object.keys(this.buttons).forEach(key => {
				this.element.appendChild(this.buttons[key])
			})
		}
	}
	exports(Menu)
})
