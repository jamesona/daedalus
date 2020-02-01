export const config = {
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
		up: ['ArrowUp', 'w'],
		down: ['ArrowDown', 's'],
		left: ['ArrowLeft', 'a'],
		right: ['ArrowRight', 'd'],
		select: ['Enter', ' '],
		back: ['Escape', 'Backspace']
	},
	roomSize: [16, 16] as [number, number],
	tileSize: 16
}
