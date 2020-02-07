import { createFeatureSelector, createSelector } from '../../lib/store'
import { InputHandler } from './input-handler'
import { InputState } from './reducer'

export const selectUserInputState = createFeatureSelector<InputState>(
	InputHandler.storeNodeName
)

export const selectCursorPosition = createSelector(
	selectUserInputState,
	state => state.cursorPosition
)

export const selectKeysDown = createSelector(
	selectUserInputState,
	state => state.keysDown
)
