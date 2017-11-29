import { CartesianGrid } from '@daedalus/common'

import { Location } from './location'
import { Room } from './room'

export class World {
	currentLocation: Location
	map: CartesianGrid<Room>
}
