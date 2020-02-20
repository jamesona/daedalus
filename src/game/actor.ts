import { Renderable } from './renderable'
import { config } from '../config'

export abstract class Actor extends Renderable {
	constructor(public locationInRoom: [number, number] = [0, 0]) {
		super()
	}

	public get drawCoordinates(): [number, number] {
		const [x, y] = this.locationInRoom.map(
			cellCoord => cellCoord * config.tileSize
		)
		return [x, y]
	}

	public abstract render(): void
}
