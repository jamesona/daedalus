import { createReducer, on } from '../../../../lib/store'
import * as fromActions from './actions'
import { Room } from '../room'
import { EntityState, EntityStateAdapter } from '../../../../lib/entity-state'

export interface DungeonState {
	rooms: EntityState<Room>
	activeRoom: Room | null
}

const roomAdapter = new EntityStateAdapter<Room>()

export const createInitialState = (): DungeonState => ({
	rooms: new EntityState<Room>(),
	activeRoom: null
})

export const dungeonReducer = createReducer(
	createInitialState(),
	on(fromActions.addRoom, (state, { room }) => {
		return {
			...state,
			rooms: roomAdapter.upsertOne(room, state.rooms)
		}
	}),
	on(fromActions.setActiveRoom, (state, { roomID }) => {
		return {
			...state,
			activeRoom: state.rooms.entities[roomID] || null
		}
	})
)
