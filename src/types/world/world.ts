import { CartesianGrid } from '@daedalus/common'

import { IsLocation } from './location'
import { IsRoom } from './room'

export class IsWorld {
	currentLocation: IsLocation
	map: CartesianGrid<IsRoom>
}
