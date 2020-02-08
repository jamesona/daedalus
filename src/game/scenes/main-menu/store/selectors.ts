import { createSelector } from '../../../../lib/store'
import { scenesState } from '../../store/selectors'

export const selectMainMenuState = createSelector(
	scenesState,
	state => state['main-menu']
)

export const selectMainMenuDimensions = createSelector(
	selectMainMenuState,
	state => state.dimensions
)
