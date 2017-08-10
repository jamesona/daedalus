'use strict'
module(() => {
	class ElementFromSelector {
		constructor(selector, config) {
			let tag = selector.split(/[#.]/)[0]
			let id = null
			if (selector.split('#').length > 1) id = selector.split('#')[1].split('.')[0]
			let classList = selector.split('.').slice(1) || null
			let element = document.createElement(tag)
			if (id) element.id = id
			classList.forEach(name => {
				element.classList.add(name)
			})

			if (config) Object.keys(config).forEach(property => {
				if (property === 'disabled' && !config.disabled) return
				element[property] = config[property] || element[property]
			})

			return element
		}
	}
	exports(ElementFromSelector)
})
