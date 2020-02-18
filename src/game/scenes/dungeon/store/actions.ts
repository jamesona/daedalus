import { createAction, props } from '../../../../lib/store'
import { Room } from '../room'

export const worldInit = createAction('[Dungeon] World Init')

export const addRoom = createAction(
	'[Dungeon] Add Room',
	props<{
		coordinates: [number, number]
		room: Room
	}>()
)

export const enterRoom = createAction(
	'[Dungeon] Enter Room',
	props<{ x: number; y: number }>()
)

export const setActiveRoom = createAction(
	'[Dungeon] Set Active Room',
	props<{ roomID: string }>()
)
