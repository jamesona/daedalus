import Tiles from '../assets/img/tiles.png'
import { config } from '../config'
import { Renderable, StateGetter, StateSetter, ChangeScene } from './renderable'

export enum TileTypes {
	Wall_1,
	Wall_2,
	Wall_3,
	Wall_4,
	Wall_5,
	Wall_6,
	Wall_7,
	NE_Corner,
	NW_Corner,
	Inner_Corners,
	E_Wall,
	W_Wall,
	Inner_Walls,
	SW_Corner,
	SE_Corner,
	Floor
}

export class Tile extends Renderable {
	constructor(
		get: StateGetter,
		set: StateSetter,
		setActiveScene: ChangeScene,
		private location: [number, number],
		private type: number
	) {
		super(get, set, setActiveScene)
	}

	private get textureCoords(): [number, number] {
		return [Math.floor(this.type / 4), this.type % 4]
	}

	public render(ctx: CanvasRenderingContext2D) {
		const { width, height } = ctx.canvas.getBoundingClientRect()
		const [x, y] = this.location
		const renderSize = Math.min(
			Math.floor(width / config.roomSize[0]),
			Math.floor(height / config.roomSize[1])
		)

		const img = new Image()
		img.src = Tiles

		ctx.imageSmoothingEnabled = false
		ctx.drawImage(
			img,
			this.textureCoords[0] * config.tileSize,
			this.textureCoords[1] * config.tileSize,
			config.tileSize,
			config.tileSize,
			x,
			y,
			renderSize,
			renderSize
		)
	}
}
