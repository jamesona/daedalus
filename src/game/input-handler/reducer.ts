import { config } from '../../config'
import { createReducer, on } from '../../lib/store'
import * as fromActions from './actions'

const { keyBindings } = config
type GameKey = keyof typeof keyBindings
const eventKeyInKeybinds = (event: KeyboardEvent) => {
	return Object.keys(keyBindings).find(gameKey =>
		keyBindings[gameKey as GameKey].includes(event.key)
	) as GameKey | undefined
}

export interface InputState {
	keysDown: Array<GameKey>
	mouseDown: boolean
	cursorPosition: [number, number] | null
}

export const createInitialState = (): InputState => ({
	keysDown: [],
	mouseDown: false,
	cursorPosition: null
})

export const userInputReducer = createReducer(
	createInitialState(),
	on(fromActions.mouseMove, (state: InputState, { event }) => ({
		...state,
		cursorPosition: [event.clientX, event.clientY] as [number, number]
	})),
	on(fromActions.mouseDown, state => ({
		...state,
		mouseDown: true
	})),
	on(fromActions.mouseUp, state => ({
		...state,
		mouseDown: false
	})),
	on(fromActions.keyDown, (state, { event }) => {
		const matchedKey = eventKeyInKeybinds(event)

		if (matchedKey && !state.keysDown.includes(matchedKey)) {
			return {
				...state,
				keysDown: [...state.keysDown, matchedKey]
			}
		}

		return state
	}),
	on(fromActions.keyUp, (state, { event }) => {
		const matchedKey = eventKeyInKeybinds(event)

		if (matchedKey && state.keysDown.includes(matchedKey)) {
			return {
				...state,
				keysDown: state.keysDown.filter(key => key !== matchedKey)
			}
		}

		return state
	})
)
