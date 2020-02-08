import { createAction, props } from '../../../../lib/store'

export interface MainMenuDimensions {
	body: {
		height: number
		width: number
		margin: number
		position: [number, number]
	}
	title: {
		height: number
		width: number
		position: [number, number]
	}
}

export const updateDimensions = createAction(
	'[Main-Menu] Update Render Dimensions',
	props<{
		dimensions: MainMenuDimensions
	}>()
)
