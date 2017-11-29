import { CartesianGrid } from '@daedalus/types'

import { IsTile } from './tile'

export interface IsFloorTile extends IsTile {
	type: 'floor'
	subtype?: string
}

export interface IsWallTile extends IsTile {
	type: 'wall'
	subtype?: string
}

export type IsRoomTile = IsFloorTile | IsWallTile

export type IsRoom = CartesianGrid<IsRoomTile>
