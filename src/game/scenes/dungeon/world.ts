import { Room } from './room'
import { addRoom } from './store/actions'
import { Scene } from '../scene'

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

	private get rooms() {
		return this.state.scenes.dungeon.rooms
	}
	private currentRoomCoordinates: [number, number] = [0, 0]
	private get currentRoom(): Room | undefined {
		const [x, y] = this.currentRoomCoordinates
		const id = World.coordinatesToID(x, y)
		return this.rooms.entities[id]
	}

	public onInit() {
		const [x, y] = this.currentRoomCoordinates

		if (!this.rooms.ids.includes(World.coordinatesToID(x, y))) {
			this.generateRoom(x, y)
		}
	}

	public render() {
		this.currentRoom && this.currentRoom.render()
	}

	private generateRoom(x: number, y: number) {
		this.store.dispatch(
			addRoom({
				room: new Room(World.coordinatesToID(x, y)),
				coordinates: [x, y]
			})
		)
	}
}
