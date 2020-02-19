import { config } from '../../../config'
import { Renderable } from '../../renderable'
import { Tile } from './tile'
import { Actor } from '../../actor'
import { ExtendedMath } from '../../../lib/math'
import { CardinalMap } from '../../../lib/cardinal-directions'

export class Room extends Renderable {
	private tiles: Tile[][] | undefined
	private get tileList(): Tile[] {
		return this.tiles?.reduce((list, row) => [...list, ...row], []) || []
	}
	public actors: Actor[] = []

	constructor(
		public readonly id: string,
		public doors: CardinalMap<boolean> = {
			north: false,
			northeast: false,
			east: false,
			southeast: false,
			south: false,
			southwest: false,
			west: false,
			northwest: false
		}
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
		if (this.doors) {
		}

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
				this.tiles[column][row] = new Tile(
					[
						Math.floor(roomLeftEdge + column * renderSize),
						Math.floor(roomTopEdge + row * renderSize)
					],
					this.determineTileType(column, columns - 1, row, rows - 1)
				)
			}
		}
	}

	private determineTileType(
		column: number,
		columnCount: number,
		row: number,
		rowCount: number
	): number {
		const properties = {
			isNorthOrSouthWall: row % rowCount == 0,
			isNorthWall: row === 0,
			isSouthWall: row === rowCount,
			isEastOrWestWall: column % columnCount == 0,
			isWestWall: column === 0,
			isEastWall: column === columnCount
		}

		let type = Tile.type.Floor

		if (properties.isWestWall) {
			if (!properties.isSouthWall) {
				type = Tile.type.W_Wall
			} else {
				type = Tile.type.SW_Corner
			}
		}

		if (properties.isEastWall) {
			if (!properties.isSouthWall) {
				type = Tile.type.E_Wall
			} else {
				type = Tile.type.SE_Corner
			}
		}

		if (properties.isNorthOrSouthWall) {
			if (!properties.isEastOrWestWall) {
				type =
					Math.random() < config.brokenWallProbability
						? ExtendedMath.randomInt(0, 6)
						: 0
			}
		}

		return type
	}
}
