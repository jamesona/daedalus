import Tiles from '../assets/img/tiles.png'
import { config } from '../config'
import { Renderable, ChangeScene } from './renderable'
import { Store } from '../lib/store'

export enum TileTypes {
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

export class Tile extends Renderable {
	constructor(
		protected store: Store<any>,
		setActiveScene: ChangeScene,
		private location: [number, number],
		private type: number
	) {
		super(setActiveScene)
	}

	private get textureCoords(): [number, number] {
		return [this.type % 4, Math.floor(this.type / 4)]
	}

	public render(ctx: CanvasRenderingContext2D) {
		const { width, height } = ctx.canvas.getBoundingClientRect()
		const [tx, ty] = this.textureCoords
		const [sx, sy] = [tx * config.tileSize, ty * config.tileSize]
		const sw = config.tileSize
		const sh = config.tileSize

		const renderSize = Math.min(
			Math.floor(width / config.roomSize[0]),
			Math.floor(height / config.roomSize[1])
		)
		const [dx, dy] = this.location
		const dw = renderSize
		const dh = renderSize

		const img = new Image()
		img.src = Tiles

		ctx.imageSmoothingEnabled = false
		ctx.drawImage(img, sx, sy, sw, sh, dx, dy, dw, dh)
	}
}
