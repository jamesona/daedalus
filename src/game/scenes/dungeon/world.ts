import { tap, map, first, take } from 'rxjs/operators'

import { ofType } from '../../../lib/store'
import { Room } from './room'
import { Scene } from '../scene'
import { selectActiveRoom, selectRooms } from './store/selectors'
import * as fromActions from './store/actions'
import {
	CardinalMap,
	getCardinalCompliment
} from '../../../lib/cardinal-directions'

const ID_SEP = ':'

export class World extends Scene {
	public static coordinatesToID(x: number, y: number): string {
		return `${x}${ID_SEP}${y}`
	}

	public static coordinatesFromID(id: string): [number, number] {
		return id
			.split(ID_SEP)
			.map(coord => Number(coord))
			.slice(0, 2) as [number, number]
	}

	public get rooms() {
		return selectRooms(this.state)
	}

	public get currentRoom(): Room | null {
		return selectActiveRoom(this.state)
	}

	public onEnterRoom$ = this.store.actions$.pipe(
		ofType(fromActions.enterRoom),
		tap(({ x, y }) => this.generateRoom(x, y)),
		map(({ x, y }) => {
			const roomID = World.coordinatesToID(x, y)
			this.store
				.selectByFunction(selectRooms)
				.pipe(
					first(rooms => !!rooms.entities[roomID]),
					take(1)
				)
				.subscribe(() => {
					this.store.dispatch(
						fromActions.setActiveRoom({
							roomID
						})
					)
				})
		})
	)

	public onInit() {
		this.onEnterRoom$.subscribe(() => console.log('Entered A Room'))
		this.store.dispatch(fromActions.enterRoom({ x: 0, y: 0 }))
	}

	public render() {
		this.currentRoom && this.currentRoom.render()
	}

	public generateRoom(x: number, y: number) {
		const neighbors = this.findNeighbors(x, y)
		const requiredDoors = mapValues(neighbors, (neighbor, direction) => {
			const opposite = getCardinalCompliment(direction)
			return !!neighbor && neighbor.doors[opposite]
		})

		this.store.dispatch(
			fromActions.addRoom({
				room: new Room(World.coordinatesToID(x, y), requiredDoors),
				coordinates: [x, y]
			})
		)
	}

	public findNeighbors(x: number, y: number): CardinalMap<Room | undefined> {
		return {
			north: this.rooms.entities[World.coordinatesToID(x, y + 1)],
			east: this.rooms.entities[World.coordinatesToID(x + 1, y)],
			south: this.rooms.entities[World.coordinatesToID(x, y - 1)],
			west: this.rooms.entities[World.coordinatesToID(x - 1, y)]
		}
	}
}

function mapValues<T, U>(
	obj: T,
	mapFn: (val: T[keyof T], key: keyof T) => U
): { [key in keyof T]: U } {
	return (Object.keys(obj) as Array<keyof typeof obj>).reduce(
		(map, key: keyof T) => {
			const val: T[keyof T] = obj[key]
			map[key] = mapFn(val, key) as U
			return map
		},
		{} as { [key in keyof T]: U }
	)
}
