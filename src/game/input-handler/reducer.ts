import { config } from '../../config'
import { createReducer, on } from '../../lib/store'
import * as fromActions from './actions'

export interface InputState {
	keysDown: Array<keyof typeof config.keyBindings>
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
	}))
)
