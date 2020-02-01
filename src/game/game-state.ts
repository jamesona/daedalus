import { World } from './world'

export class GameState {
	constructor(
		previousState: Partial<GameState> = {},
		delta: Partial<GameState> = {}
	) {
		Object.assign(this, previousState, delta)
	}

	public cursorPosition: [number, number] | undefined
	public keys: string[] = []
	public mouseDown: boolean = false
	public world: World | undefined
}
