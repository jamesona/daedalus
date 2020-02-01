import { Room } from './room'
import { Renderable } from './renderable'
import { GameState } from './game-state'

export class World extends Renderable {
	private map: Room[][] = [[]]
	private currentRoom: [number, number] = [0, 0]

	public render(ctx: CanvasRenderingContext2D) {
		const [x, y] = this.currentRoom

		if (!this.map[x][y]) {
			this.generateRoom(x, y)
		}
		this.map[x][y].render(ctx)
	}

	private generateRoom(x: number, y: number): Room {
		if (!Array.isArray(this.map[x])) {
			this.map[x] = []
		}
		this.map[x][y] = new Room(
			() => this.state,
			(newState: GameState) => {
				this.state = newState
			},
			(scene: Renderable) => this.setActiveScene(scene)
		)
		return this.map[x][y]
	}
}
