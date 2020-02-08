const defaults = {
	title: 'Daedalus',
	fontName: 'Press Start 2P',
	fontScale: 100,
	selectedItemColor: '#501500',
	menuColor: '#555',
	menuItemColor: '#444',
	menuTextColor: '#bbb',
	menuTextHoverColor: '#eee',
	menuItemDisabledColor: '#666',
	menuTextDisabledColor: '#444',
	keyBindings: {
		up: ['ArrowUp', 'w', 'W'],
		down: ['ArrowDown', 's', 'S'],
		left: ['ArrowLeft', 'a', 'A'],
		right: ['ArrowRight', 'd', 'D'],
		select: ['Enter', ' '],
		back: ['Escape', 'Backspace']
	},
	cursorPollRate: 10,
	roomSize: [16, 16] as [number, number],
	tileSize: 16
}

const userPreferences = {}

export const config = Object.assign({}, defaults, userPreferences)
