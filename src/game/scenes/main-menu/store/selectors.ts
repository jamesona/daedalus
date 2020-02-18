import { createSelector } from '../../../../lib/store'
import { selectScenes } from '../../store/selectors'

export const selectMainMenuState = createSelector(
	selectScenes,
	state => state['main-menu']
)

export const selectMainMenuDimensions = createSelector(
	selectMainMenuState,
	state => state.dimensions
)
