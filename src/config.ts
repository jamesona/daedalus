const defaults = {
	title: 'Daedalus',
	fontName: 'Press Start 2P',
	fontScale: 0.1,
	menuColor: '#666',
	menuItemColor: '#555',
	menuItemHoverColor: '#644',
	menuTextColor: '#ccc',
	menuTextHoverColor: '#fff',
	keyBindings: {
		up: ['ArrowUp', 'w'],
		down: ['ArrowDown', 's'],
		left: ['ArrowLeft', 'a'],
		right: ['ArrowRight', 'd'],
		select: ['Enter', ' '],
		back: ['Escape', 'Backspace']
	}
}

const userPreferences = {}

export const config = Object.assign({}, defaults, userPreferences)
