import { CartesianGrid } from '@daedalus/common'

import { Tile } from './tile'

export interface FloorTile extends Tile {
	type: 'floor'
	subtype?: string
}

export interface WallTile extends Tile {
	type: 'wall'
	subtype?: string
}

export type RoomTile = FloorTile | WallTile

export type Room = CartesianGrid<RoomTile>
