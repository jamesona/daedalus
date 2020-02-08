import { createReducer, on } from '../../../../lib/store'
import { MainMenuDimensions, updateDimensions } from './actions'

export interface MainMenuState {
	dimensions: MainMenuDimensions
}

export const createInitialState = (): MainMenuState => ({
	dimensions: {
		body: {
			height: 0,
			width: 0,
			margin: 0,
			position: [0, 0]
		},
		title: {
			height: 0,
			width: 0,
			position: [0, 0]
		}
	}
})

export const mainMenuReducer = createReducer(
	createInitialState(),
	on(updateDimensions, (state, { dimensions }) => ({
		...state,
		dimensions
	}))
)
