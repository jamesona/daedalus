import { Renderable } from './renderable'
import { config } from '../config'

export abstract class Actor extends Renderable {
	public locationInRoom: [number, number] = [0, 0]

	public get drawCoordinates(): [number, number] {
		const [x, y] = this.locationInRoom.map(
			cellCoord => cellCoord * config.tileSize
		)
		return [x, y]
	}

	constructor() {
		super()
	}

	public abstract render(): void
}
