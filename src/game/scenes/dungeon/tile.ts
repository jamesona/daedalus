import Tiles from '../../../assets/img/tiles.png'
import { config } from '../../../config'
import { Renderable } from '../../renderable'

export class Tile extends Renderable {
	static readonly textures = (() => {
		const img = new Image()
		img.src = Tiles
		return img
	})()
	static readonly type = (() => {
		enum TileTypes {
			Wall_1,
			Wall_2,
			Wall_3,
			Wall_4,

			Wall_5,
			Wall_6,
			Wall_7,
			Door_SW,

			Door_SE,
			Inner_Corners,
			W_Wall,
			E_Wall,

			Inner_Walls,
			SW_Corner,
			SE_Corner,
			Floor
		}
		return TileTypes
	})()

	public needsToRender: boolean = true

	constructor(public location: [number, number], public type: number) {
		super()
	}

	public render() {
		this.drawTile()
	}

	public get renderSize(): number {
		const { width, height } = this.ctx.canvas.getBoundingClientRect()

		return Math.min(
			Math.floor(width / config.roomSize[0]),
			Math.floor(height / config.roomSize[1])
		)
	}

	public get textureCoords() {
		const [textureX, textureY] = [this.type % 4, Math.floor(this.type / 4)]
		const [sourceX, sourceY] = [
			textureX * config.tileSize,
			textureY * config.tileSize
		]
		const sourceWidth = config.tileSize
		const sourceHeight = config.tileSize

		const [drawX, drawY] = this.location
		const drawWidth = this.renderSize
		const drawHeight = this.renderSize

		return {
			sourceX,
			sourceY,
			sourceWidth,
			sourceHeight,
			drawX,
			drawY,
			drawWidth,
			drawHeight
		}
	}

	public drawTile() {
		const {
			sourceX,
			sourceY,
			sourceWidth,
			sourceHeight,
			drawX,
			drawY,
			drawWidth,
			drawHeight
		} = this.textureCoords

		this.ctx.imageSmoothingEnabled = false
		this.ctx.drawImage(
			Tile.textures,
			sourceX,
			sourceY,
			sourceWidth,
			sourceHeight,
			drawX,
			drawY,
			drawWidth,
			drawHeight
		)
	}
}
