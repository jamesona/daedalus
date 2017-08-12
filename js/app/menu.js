'use strict'
document.head.innerHTML += `<link rel="stylesheet" href="css/menu.css" />`
module('app/element', Element => {
	let events = []
	class Menu {
		constructor() {
			this.element = new Element('menu-holder')
			this.menus = {
				main: new MainMenu(events),
				new: new NewMenu(events)
			}
			this.element.appendChild(this.menus.new.element)
			this.activeMenu = this.menus.new
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
					if (this.activeMenu === this.menus.new) {
						this.element.removeChild(this.menus.new.element)
						this.element.appendChild(this.menus.main.element)
						this.activeMenu = this.menus.main
					}
					this.handleEvent({text: 'close menu'})
					break
				case 'close menu':
					this.element.style.display = 'none'
					break
				case 'open menu':
					if (this.element.style.display === '')
						this.element.style.display = 'none'
					else
						this.element.style.display = ''
			}
		}
	}

	class MainMenu {
		constructor() {
			this.element = new Element('menu')
			this.element.innerHTML = `<h1>Daedalus</h1>`
			this.buttons = {
				close: new Element('button', {
					onclick: () => {
						events.push({text: 'close menu', target: this})
					},
					innerHTML: 'Close'
				}),
				save: new Element('button', {
					onclick: () => {
						events.push({text: 'save game', target: this})
					},
					innerHTML: 'Save'
				}),
				new: new Element('button', {
					onclick: () => {
						events.push({text: 'new game', target: this})
					},
					innerHTML: 'New Game'
				}),
				export: new Element('a', {
					onclick: (evt) => {
						debugger
						let data = new Blob([btoa(localStorage['daedalus-save'])])
						let url = window.URL.createObjectURL(data)
						evt.target.href = url
						evt.target.innerHTML = 'Open Data'
					},
					target: '_blank',
					innerHTML: 'Export Save'
				}),
				about: new Element('a', {
					href: 'about.html',
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
			this.element = new Element('menu')
			this.element.innerHTML += `<h1>Daedalus</h1>`
			this.buttons = {
				new: new Element('button', {
					onclick: () => {
						events.push({text: 'new game', target: this})
					},
					innerHTML: 'New Game'
				}),
				continue: new Element('button', {
					onclick: () => {
						events.push({text: 'load game', target: this})
					},
					innerHTML: 'Continue Game',
					disabled: !localStorage.getItem('daedalus-save')
				}),
				import: new Element('button', {
					onclick: () => {
						events.push({text: 'import save', target: this})
					},
					innerHTML: 'Import Save'
				}),
				export: new Element('a', {
					onclick: (evt) => {
						let data = new Blob([btoa(localStorage['daedalus-save'])])
						let url = window.URL.createObjectURL(data)
						evt.target.href = url
						setTimeout(()=>{
							evt.target.href = ''
						}, 500)
					},
					target: '_blank',
					innerHTML: 'Export Save'
				}),
				about: new Element('a', {
					href: 'about.html',
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
