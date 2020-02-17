import { createReducer, on } from '../../../../lib/store'
import * as fromActions from './actions'
import { Room } from '../room'
import { EntityState, EntityStateAdapter } from '../../../../lib/entity-state'

export interface DungeonState {
	rooms: EntityState<Room>
}

const roomAdapter = new EntityStateAdapter<Room>()

export const createInitialState = (): DungeonState => ({
	rooms: new EntityState<Room>()
})

export const dungeonReducer = createReducer(
	createInitialState(),
	on(fromActions.addRoom, (state, { room }) => {
		return {
			...state,
			rooms: roomAdapter.upsertOne(room, state.rooms)
		}
	})
)
