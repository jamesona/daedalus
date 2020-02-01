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
				const isNorthOrSouthWall = row % (rows - 1) == 0
				const isNorthWall = row === 0
				const isSouthWall = row === rows - 1
				const isEastOrWestWall = column % (columns - 1) == 0
				const isWestWall = column === 0
				const isEastWall = column === columns - 1

				let type = TileTypes.Floor

				if (isWestWall) type = TileTypes.W_Wall

				// if (isEastWall) type = TileTypes.E_Wall
				// somehow tex 14 is getting swapped with 11,
				// and 13 is getting swapped with 7
				if (isEastWall) type = TileTypes.SE_Corner

				if (isNorthOrSouthWall) {
					if (isNorthWall) {
						if (!isEastOrWestWall) {
							type = TileTypes.Wall_1
						}
					}

					if (isSouthWall) {
						if (!isEastOrWestWall) {
							type = TileTypes.Wall_1
						} else if (isWestWall) {
							// type = TileTypes.SW_Corner
							type = TileTypes.Door_SW
						} else if (isEastWall) {
							// type = TileTypes.SE_Corner
							type = TileTypes.E_Wall
						}
					}
				}

				// if (isNorthOrSouthWall) {
				// 	// type = TileTypes.Wall_1
				// 	if (isNorthWall) {
				// 		if (isWestWall) {
				// 			type = TileTypes.W_Wall
				// 		} else if (isEastWall) {
				// 			type = TileTypes.E_Wall
				// 		}
				// 	}
				// 	if (isSouthWall) {
				// 		if (isWestWall) {
				// 			type = TileTypes.SW_Corner
				// 		} else if (isEastWall) {
				// 			type = TileTypes.SE_Corner
				// 		}
				// 	}
				// }
				// if (isEastWall) {
				// 	type = TileTypes.E_Wall
				// }

				// if (isWestWall) {
				// 	console.log('West Wall is tile', TileTypes.W_Wall)
				// 	type = TileTypes.W_Wall
				// }

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
					type
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
