import { createSelector } from '../../../../lib/store'
import { selectScenes } from '../../store/selectors'

export const selectDungeonState = createSelector(
	selectScenes,
	({ dungeon }) => dungeon
)

export const selectRooms = createSelector(
	selectDungeonState,
	({ rooms }) => rooms
)

export const selectActiveRoom = createSelector(
	selectDungeonState,
	({ activeRoom }) => {
		console.log('active room:', activeRoom)
		return activeRoom
	}
)
