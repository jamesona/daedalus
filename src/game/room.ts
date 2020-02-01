import { Renderable, StateGetter, ChangeScene, StateSetter } from './renderable'
import { config } from '../config'
import { Tile, TileTypes } from './tile'
import { GameState } from './game-state'

export class Room extends Renderable {
	private tiles: Tile[][] | undefined

	constructor(
		get: StateGetter,
		set: StateSetter,
		setActiveScene: ChangeScene,
		private requiredDoors: [boolean, boolean, boolean, boolean] = [
			false,
			false,
			false,
			false
		]
	) {
		super(get, set, setActiveScene)
	}
	public generate(ctx: CanvasRenderingContext2D) {
		console.log(this.requiredDoors)

		this.tiles = [[]]
		const { width, height } = ctx.canvas.getBoundingClientRect()
		const renderSize = Math.min(
			Math.floor(width / config.roomSize[0]),
			Math.floor(height / config.roomSize[1])
		)
		const [x, y] = [width / 2, height / 2]
		const roomWidth = config.roomSize[0] * renderSize
		const roomHeight = config.roomSize[1] * renderSize
		const roomLeftEdge = x - roomWidth / 2
		const roomTopEdge = y - roomHeight / 2

		const [columns, rows] = config.roomSize

		for (let column = 0; column < columns; column++) {
			this.tiles[column] = []
			for (let row = 0; row < rows; row++) {
				this.tiles[column][row] = new Tile(
					() => this.state,
					(newState: GameState) => {
						this.state = newState
					},
					(scene: Renderable) => this.setActiveScene(scene),
					[
						Math.floor(roomLeftEdge + column * renderSize),
						Math.floor(roomTopEdge + row * renderSize)
					],
					TileTypes.Floor
				)
			}
		}
	}

	public render(ctx: CanvasRenderingContext2D) {
		if (!this.tiles) {
			this.generate(ctx)
		}

		this.tiles?.forEach(column => {
			column.forEach(tile => {
				tile.render(ctx)
			})
		})
	}
}
