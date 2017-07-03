class Game {
	constructor() {
		document.body.innerHTML = ''
		this.clientHeight = document.documentElement.clientHeight
		this.clientWidth = document.documentElement.clientWidth
		this.aspectRatio = (clientWidth * 0.8) / clientHeight
		document.querySelector('main div').style.flexGrow = this.aspectRatio
		this.view = document.querySelector('table')
		this.viewData = new Array(5).fill(new Array(5).fill({}))
		this.viewData.forEach(row => {
			var tableRow = document.createElement('tr')
			row.forEach(cell => {
				tableCell = document.createElement('td')
				tableRow.append(tableCell)
			})
			view.append(tableRow)
		})
	}

	clearBody() {
		let childCount = document.body.children.length
		for (let i=0; i < childCount; i++) {
			const child = document.body.children[i]
			document.body.removeChild(child)
		}
	}
}

class MapCell {
	constructor() {
		this = new Array(5).fill(null).map(cell => new Array(5).fill(null))
	}
}
