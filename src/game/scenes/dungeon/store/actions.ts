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
