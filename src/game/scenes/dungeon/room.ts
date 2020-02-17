import { config } from '../../../config'
import { Renderable } from '../../renderable'
import { Tile } from './tile'
import { Actor } from '../../actor'

export class Room extends Renderable {
	private tiles: Tile[][] | undefined
	private get tileList(): Tile[] {
		return this.tiles?.reduce((list, row) => [...list, ...row], []) || []
	}
	private actors: Actor[] = []

	constructor(
		public readonly id: string,
		private requiredDoors: [boolean, boolean, boolean, boolean] = [
			false,
			false,
			false,
			false
		]
	) {
		super()
	}

	public onInit() {
		this.generate()
	}

	public render() {
		this.tileList.forEach(tile => {
			tile.render()
		})

		this.actors.forEach(actor => {
			actor.render()
		})
	}

	public addActor(actorToAdd: Actor) {
		if (!this.actors.includes(actorToAdd)) {
			this.actors.push(actorToAdd)
		}
	}

	public removeActor(actorToRemove: Actor) {
		this.actors = this.actors.filter(actor => actor !== actorToRemove)
	}

	public generate() {
		console.log(this.requiredDoors)

		this.tiles = [[]]
		const { width, height } = this.ctx.canvas.getBoundingClientRect()
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

				let type = Tile.type.Floor

				if (isWestWall) type = Tile.type.W_Wall

				if (isEastWall) type = Tile.type.E_Wall

				if (isNorthOrSouthWall) {
					if (isNorthWall) {
						if (!isEastOrWestWall) {
							type = Tile.type.Wall_4
						}
					}

					if (isSouthWall) {
						if (!isEastOrWestWall) {
							type = Tile.type.Wall_1
						} else if (isWestWall) {
							type = Tile.type.SW_Corner
						} else if (isEastWall) {
							type = Tile.type.SE_Corner
						}
					}
				}

				this.tiles[column][row] = new Tile(
					[
						Math.floor(roomLeftEdge + column * renderSize),
						Math.floor(roomTopEdge + row * renderSize)
					],
					type
				)
			}
		}
	}
}
